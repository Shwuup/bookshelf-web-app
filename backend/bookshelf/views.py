from django.shortcuts import render
from bookshelf.models import Book, BookList, Author, Publisher, BookInfo
from bookshelf.serializers import (
    BookSerializer,
    BookListSerializer,
    BookListSerializerFull,
    PublisherSerializer,
    AuthorSerializer,
)
from rest_framework import generics
from django.http import HttpResponse
from django.contrib.auth.models import User
import json

from rest_framework import authentication, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view


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

    body_unicode = request.body.decode("utf-8")
    body = json.loads(body_unicode)
    bookInfo = body["data"]
    bookListName = body["bookListName"]
    book_ids = [bookInfo[k]["book_id"] for k in bookInfo]
    bookList = BookList(name=bookListName, owner=user)
    bookList.save()
    for ids in book_ids:
        obj = Book.objects.get(book_id=ids)
        bookInfoObj = BookInfo(book=obj)
        bookInfoObj.save()
        bookList.book_infos.add(bookInfoObj)

    return HttpResponse("Completed successfully!")


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

