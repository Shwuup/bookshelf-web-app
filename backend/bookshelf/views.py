from django.shortcuts import render
from bookshelf.models import Book, BookList
from bookshelf.serializers import BookSerializer, BookListSerializer
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


class ViewAllBookLists(APIView):
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        book_list = BookList.objects.get(owner=request.user)
        serializer = BookListSerializer(book_list)
        return JsonResponse(serializer.data)

