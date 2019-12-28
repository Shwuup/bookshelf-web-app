from django.shortcuts import render
from bookshelf.models import Book, BookList
from bookshelf.serializers import (
    BookSerializer,
    BookListSerializer,
    BookListSerializerFull,
)
from rest_framework import generics
from django.http import HttpResponse
from django.contrib.auth.models import User
import json
from rest_framework import authentication, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import HttpResponse, JsonResponse


class BookCreate(generics.ListCreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer


class BookListCreate(generics.ListCreateAPIView):
    queryset = BookList.objects.all()
    serializer_class = BookListSerializer


def signup(request):
    body = json.loads(request.body)
    User.objects.create_user(
        username=body["user"], email=body["email"], password=body["password"]
    )
    return HttpResponse("Account made!")


def handle_search(request):
    print(request.GET.get("query"))
    term = request.GET.get("query")
    books = Book.objects.all()
    filtered_books = books.filter(title__contains=term)
    serializer = BookSerializer(filtered_books, many=True)
    book_j = serializer.data
    return JsonResponse(book_j, safe=False)


class ViewAllBookLists(APIView):
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        book_list_queryset = BookList.objects.filter(owner=request.user)
        serializer = BookListSerializerFull
        book_lists = [serializer(i).data for i in book_list_queryset]
        return JsonResponse(book_lists, safe=False)

