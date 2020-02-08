from rest_framework import serializers
from bookshelf.models import Book, BookInfo, BookList, Author, Publisher


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
        depth = 2


class BookInfoSerializer(serializers.ModelSerializer):
    date_finished_reading = serializers.DateField(format="%d/%m/%Y")

    class Meta:
        model = BookInfo
        fields = "__all__"
        depth = 2


class BookListSerializerFull(serializers.ModelSerializer):
    book_infos = BookInfoSerializer(many=True, read_only=True)

    class Meta:
        model = BookList
        exclude = ["owner"]
        depth = 3


class BookListSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookList
        fields = "__all__"
