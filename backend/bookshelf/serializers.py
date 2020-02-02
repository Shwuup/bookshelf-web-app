from rest_framework import serializers
from bookshelf.models import Book, BookList, Author, Publisher


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = "__all__"


class PublisherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publisher
        fields = "__all__"


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = "__all__"


class BookListSerializerFull(serializers.ModelSerializer):
    class Meta:
        model = BookList
        exclude = ("owner", "id")
        depth = 3


class BookListSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookList
        fields = "__all__"
