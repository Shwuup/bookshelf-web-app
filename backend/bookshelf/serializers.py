from rest_framework import serializers
from bookshelf.models import Book, Author, BookStatus, Publisher, Update
from django.contrib.auth.models import User, Group


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
    class Meta:
        model = Book
        fields = "__all__"
        depth = 2


class BookStatusBookSerializer(serializers.ModelSerializer):
    author = AuthorField(many=True, read_only=True)

    class Meta:
        model = Book
        fields = ["title", "author", "image_url", "book_id"]
        depth = 2


class BookStatusSerializer(serializers.ModelSerializer):
    book = BookStatusBookSerializer()

    class Meta:
        model = BookStatus
        fields = ["book_status_id", "book"]


class BookUpdateSerializer(serializers.ModelSerializer):
    author = AuthorField(many=True, read_only=True)

    class Meta:
        model = Book
        fields = ["title", "author", "blurb", "image_url", "book_id"]
        depth = 2


class UpdateSerializer(serializers.ModelSerializer):
    book = BookUpdateSerializer()

    class Meta:
        model = Update
        fields = [
            "update_id",
            "book",
            "rating",
            "type",
            "timestamp",
        ]
