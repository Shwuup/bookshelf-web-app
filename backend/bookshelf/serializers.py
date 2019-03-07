from rest_framework import serializers
from bookshelf.models import Book, BookList


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = "__all__"


class BookListSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookList
        exclude = ("owner", "id")
        depth = 1

