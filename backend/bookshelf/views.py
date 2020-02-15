from django.shortcuts import render
from bookshelf.models import Book, Author, Publisher, BookInfo
from bookshelf.serializers import (
    BookSerializer,
    PublisherSerializer,
    AuthorSerializer,
    BookInfoSerializer,
)
from rest_framework import generics
from django.http import HttpResponse, JsonResponse, Http404
from django.contrib.auth.models import User
import json
from rest_framework import authentication, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view
from datetime import datetime
from rest_framework import status


class AuthorList(generics.ListCreateAPIView):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer


class BookList(generics.ListCreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer


class PublisherList(generics.ListCreateAPIView):
    queryset = Publisher.objects.all()
    serializer_class = PublisherSerializer


class BookInfoList(generics.ListCreateAPIView):
    queryset = BookInfo.objects.all()
    serializer_class = BookInfoSerializer
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (authentication.TokenAuthentication,)

    def create(self, request):
        user = request.user
        body = request.data
        book_id = body["bookId"]
        date = body["dateRead"]
        new_book = Book.objects.get(book_id=book_id)
        book_info = BookInfo(book=new_book, user=user)
        if date is not None:
            book_info.is_read = True
            book_info.date_finished_reading = datetime.strptime(date, "%d/%m/%Y").date()
        book_info.save()
        serializer = BookInfoSerializer(book_info)
        return JsonResponse(serializer.data)


class BookDetail(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (authentication.TokenAuthentication,)

    def get_object(self, pk):
        try:
            return BookInfo.objects.get(book_info_id=pk)
        except BookInfo.DoesNotExist:
            raise Http404

    def patch(self, request, pk, format=None):
        user = request.user
        date = request.data["dateAdded"]
        book_info = self.get_object(pk)
        serializer = BookInfoSerializer(book_info)
        book_info.is_read = True
        book_info.date_finished_reading = datetime.strptime(date, "%d/%m/%Y").date()
        book_info.save()
        return HttpResponse("Updated successfully")

    def delete(self, request, pk, format=None):
        user = request.user
        book_info = self.get_object(pk)
        book_info.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


def signup(request):
    body = json.loads(request.body)
    User.objects.create_user(
        username=body["user"], email=body["email"], password=body["password"]
    )
    return HttpResponse("Account made!")


def handle_search(request):
    term = request.GET.get("query")
    books = Book.objects.all()
    filtered_books = books.filter(title__contains=term)
    serializer = BookSerializer(filtered_books, many=True)
    response_payload = serializer.data

    return JsonResponse(response_payload, safe=False)

