from rest_framework import serializers
from bookshelf.models import Book, Author, BookStatus, Publisher, Update
from django.contrib.auth.models import User, Group


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id"]


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = "__all__"


class AuthorField(serializers.RelatedField):
    def to_representation(self, value):
        return {"id": value.author_id, "name": f"{value.first_name} {value.last_name}"}


class PublisherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publisher
        fields = "__all__"


class BookSerializer(serializers.ModelSerializer):
    author = AuthorField(many=True, read_only=True)

    class Meta:
        model = Book
        fields = "__all__"
        depth = 2


class BookStatusAndUpdateBookSerializer(serializers.ModelSerializer):
    author = AuthorField(many=True, read_only=True)

    class Meta:
        model = Book
        fields = ["title", "author", "image", "book_id", "blurb"]
        depth = 2


class BookStatusSerializer(serializers.ModelSerializer):
    book = BookStatusAndUpdateBookSerializer(read_only=True)
    user = UserSerializer(read_only=True)

    class Meta:
        model = BookStatus
        depth = 2
        fields = "__all__"


class UpdateSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    book_status = BookStatusSerializer(read_only=True)

    class Meta:
        model = Update
        fields = ["update_id", "rating", "status", "timestamp", "user", "book_status"]
        depth = 2
