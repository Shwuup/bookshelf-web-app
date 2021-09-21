from django.core.exceptions import ObjectDoesNotExist
from bookshelf.models import Book, Author, Publisher, Update, BookStatus
from bookshelf.serializers import (
    BookSearchSerializer,
    BookSerializer,
    BookStatusSerializer,
    BookStatus,
    PublisherSerializer,
    AuthorSerializer,
    UpdateSerializer,
)
from rest_framework import generics
from django.http import HttpResponse, JsonResponse, Http404
from django.contrib.auth.models import User
import json
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework.parsers import JSONParser
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.authtoken.views import ObtainAuthToken


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


class UpdateView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, request, user_id):
        updates = Update.objects.filter(user_id=user_id)
        serializer = UpdateSerializer(updates, many=True)
        response = serializer.data
        return JsonResponse(response, safe=False)

    def post(self, request, user_id):
        data = JSONParser().parse(request)
        user = User.objects.get(id=user_id)
        book_status = BookStatus.objects.get(
            book_status_id=data["book_status"]["book_status_id"]
        )
        update = Update(
            status=data["status"],
            rating=data["rating"],
            timestamp=data["timestamp"],
            user=user,
            book_status=book_status,
        )
        update.save()
        response = UpdateSerializer(update)
        return JsonResponse(response.data, status=status.HTTP_201_CREATED)


class Shelf(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, request, user_id):
        try:
            filter_by = request.GET.get("filter")
            if filter_by == "book":
                book_id = request.GET.get("book-id")
                book_status = BookStatus.objects.get(user_id=user_id, book_id=book_id)
                serializer = BookStatusSerializer(book_status)
                response = serializer.data
                return JsonResponse(response)
            elif filter_by is None:
                status = request.GET.get("status")
                if status == "read":
                    book_statuses = BookStatus.objects.filter(
                        status="read", user_id=user_id
                    )
                elif status == "reading":
                    book_statuses = BookStatus.objects.filter(
                        status="reading", user_id=user_id
                    )
                elif status == "want-to-read":
                    book_statuses = BookStatus.objects.filter(
                        status="want to read", user_id=user_id
                    )
                else:
                    book_statuses = BookStatus.objects.filter(user_id=user_id)

                serializer = BookStatusSerializer(book_statuses, many=True)
                response_payload = serializer.data
                return JsonResponse(response_payload, safe=False)
        except ObjectDoesNotExist:
            return JsonResponse(
                {"message": "Book status not found for book"}, status=404
            )

    def post(self, request, user_id):
        data = JSONParser().parse(request)
        book = Book.objects.get(book_id=data["book"]["book_id"])
        user = User.objects.get(id=user_id)
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

    def put(self, request, user_id):
        data = JSONParser().parse(request)
        book_status_id = data["book_status_id"]
        try:
            book_status = BookStatus.objects.get(
                book_status_id=book_status_id, user_id=user_id
            )
        except BookStatus.DoesNotExist:
            return HttpResponse(status=404)

        serializer = BookStatusSerializer(book_status, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)


class CustomGetAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        response = super(CustomGetAuthToken, self).post(request, *args, **kwargs)
        token = Token.objects.get(key=response.data["token"])
        return JsonResponse({"token": token.key, "id": token.user_id})


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
    serializer = BookSearchSerializer(filtered_books, many=True)
    response_payload = serializer.data

    return JsonResponse(response_payload, safe=False)
