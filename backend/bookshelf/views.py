from bookshelf.models import Book, Author, Publisher, Update, BookStatus
from bookshelf.serializers import (
    BookSerializer,
    BookStatusSerializer,
    PublisherSerializer,
    AuthorSerializer,
    UpdateSerializer,
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
from rest_framework import viewsets
from django.contrib.auth.models import User, Group
from rest_framework.parsers import JSONParser
from rest_framework.decorators import authentication_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly


class AuthorList(generics.ListCreateAPIView):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer


class UpdateList(generics.ListCreateAPIView):
    permission_classes = []
    authentication_classes = []
    queryset = Update.objects.all()
    serializer_class = UpdateSerializer

    def create(self, request):
        data = request.data
        book_status = BookStatus.objects.get(
            book_status_id=data["book_status"]["book_status_id"]
        )
        user = User.objects.get(id=data["user"]["id"])
        new_update = Update(
            book_status=book_status,
            rating=data["rating"],
            status=data["status"],
            timestamp=data["timestamp"],
            user=user,
        )
        new_update.save()
        serializer = UpdateSerializer(new_update)
        return Response(serializer.data)


class BookList(generics.ListCreateAPIView):
    permission_classes = []
    authentication_classes = []
    queryset = Book.objects.all()
    serializer_class = BookSerializer


class BookGet(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get_object(self, pk):
        try:
            return Book.objects.get(book_id=pk)
        except Book.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        book = self.get_object(pk)
        serializer = BookSerializer(book)
        return Response(serializer.data)


class PublisherList(generics.ListCreateAPIView):
    queryset = Publisher.objects.all()
    serializer_class = PublisherSerializer


class AllBooks(generics.ListCreateAPIView):
    permission_classes = []
    authentication_classes = []
    queryset = BookStatus.objects.all()
    serializer_class = BookStatusSerializer


class Shelf(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, request):
        status = request.GET.get("status")
        if status == "read":
            book_statuses = BookStatus.objects.filter(status__exact="read")
        elif status == "reading":
            book_statuses = BookStatus.objects.filter(status__exact="reading")
        elif status == "want-to-read":
            book_statuses = BookStatus.objects.filter(status__exact="want to read")
        else:
            book_statuses = BookStatus.objects.all()

        serializer = BookStatusSerializer(book_statuses, many=True)
        response_payload = serializer.data
        return JsonResponse(response_payload, safe=False)

    def post(self, request):
        data = JSONParser().parse(request)
        book = Book.objects.get(book_id=data["book"]["book_id"])
        user = User.objects.get(id=data["user"]["id"])
        book_status = BookStatus(
            timestamp=data["timestamp"],
            rating=data["rating"],
            status=data["status"],
            book=book,
            user=user,
        )
        book_status.save()
        serializer = BookStatusSerializer(book_status)
        return JsonResponse(serializer.data, status=200)


class BookStatusPut(APIView):
    def put(self, request, pk):
        try:
            book_status = BookStatus.objects.get(book_status_id=pk)
        except BookStatus.DoesNotExist:
            return HttpResponse(status=404)

        data = JSONParser().parse(request)
        serializer = BookStatusSerializer(book_status, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)


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
    filtered_books = books.filter(title__istartswith=term)
    serializer = BookSerializer(filtered_books, many=True)
    response_payload = serializer.data

    return JsonResponse(response_payload, safe=False)
