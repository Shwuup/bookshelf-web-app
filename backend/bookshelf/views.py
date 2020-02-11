from django.shortcuts import render
from bookshelf.models import Book, BookList, Author, Publisher, BookInfo
from bookshelf.serializers import (
    BookSerializer,
    BookListSerializer,
    BookListSerializerFull,
    PublisherSerializer,
    AuthorSerializer,
    BookInfoSerializer,
)
from rest_framework import generics
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.models import User
import json
from rest_framework import authentication, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view
from datetime import datetime


class AuthorCreate(generics.ListCreateAPIView):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer


class BookCreate(generics.ListCreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer


class PublisherCreate(generics.ListCreateAPIView):
    queryset = Publisher.objects.all()
    serializer_class = PublisherSerializer


class BookListCreate(generics.ListCreateAPIView):
    queryset = BookList.objects.all()
    serializer_class = BookListSerializer


def signup(request):
    body = json.loads(request.body)
    User.objects.create_user(
        username=body["user"], email=body["email"], password=body["password"]
    )
    return HttpResponse("Account made!")


@csrf_exempt
@api_view(["POST"])
def add_new_booklist(request):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (authentication.TokenAuthentication,)
    user = request.user

    body = request.data
    bookInfo = body["data"]
    bookListName = body["bookListName"]
    book_ids = [bookInfo[k]["book_id"] for k in bookInfo]
    bookList = BookList(name=bookListName, owner=user)
    bookList.save()
    for ids in book_ids:
        obj = Book.objects.get(book_id=ids)
        bookInfoObj = BookInfo(book=obj, book_list=bookList)
        bookInfoObj.save()

    return HttpResponse("Completed successfully!")


@api_view(["POST"])
def add_new_book(request):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (authentication.TokenAuthentication,)
    user = request.user

    body = request.data
    book_list_id = body["bookListId"]
    book_id = body["bookId"]
    new_book = Book.objects.get(book_id=book_id)
    book_list = BookList.objects.get(id=book_list_id)
    book_info = BookInfo(book=new_book, book_list=book_list)
    book_info.save()
    serializer = BookInfoSerializer(book_info)
    return JsonResponse(serializer.data)
    # return HttpResponse("Added successfully")


@api_view(["PUT"])
def add_book_to_read(request):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (authentication.TokenAuthentication,)
    user = request.user
    body = request.data["data"]
    book_info_id = body["bookInfoId"]
    book_info = BookInfo.objects.get(book_info_id=book_info_id)
    book_info.is_read = True
    date = datetime.now()
    book_info.date_finished_reading = date
    book_info.save()

    return HttpResponse("Updated successfully")


@api_view(["DELETE"])
def delete_booklist(request):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (authentication.TokenAuthentication,)
    user = request.user

    body = request.data
    bookListId = body["id"]
    BookList.objects.get(id=bookListId).delete()

    return HttpResponse("Deleted successfully")


@api_view(["DELETE"])
def delete_book(request):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (authentication.TokenAuthentication,)
    user = request.user

    body = request.data
    book_info_id = body["bookInfoId"]
    book_info = BookInfo.objects.get(book_info_id=book_info_id)
    book_info.delete()

    return HttpResponse("Deleted successfully")


def handle_search(request):
    term = request.GET.get("query")
    books = Book.objects.all()
    filtered_books = books.filter(title__contains=term)
    serializer = BookSerializer(filtered_books, many=True)
    response_payload = serializer.data

    return JsonResponse(response_payload, safe=False)


class ViewAllBookLists(APIView):
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        book_list_queryset = BookList.objects.filter(owner=request.user)
        serializer = BookListSerializerFull
        book_lists = [serializer(i).data for i in book_list_queryset]
        return JsonResponse(book_lists, safe=False)

