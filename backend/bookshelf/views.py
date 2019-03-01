from django.shortcuts import render
from bookshelf.models import Book
from bookshelf.serializers import BookSerializer
from rest_framework import generics
from django.http import HttpResponse
from django.contrib.auth.models import User
import json

class BookCreate(generics.ListCreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer


def signup(request):
    body = json.loads(request.body)
    User.objects.create_user(username=body["user"], 
                            email=body["email"], 
                            password=body["password"])
    return HttpResponse("Account made!")
