from django.db import models
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

# Create your models here.


class Book(models.Model):
    isbn = models.CharField(max_length=200, primary_key=True)
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=200)
    publisher = models.CharField(max_length=200)
    pub_date = models.DateField("date published")
    pages = models.PositiveIntegerField()
    language = models.CharField(max_length=200, default="")
    book_cover_path = models.CharField(max_length=200, default="")

    def __str__(self):
        return self.title


class BookList(models.Model):
    name = models.CharField(max_length=200)
    date_created = models.DateTimeField()
    books = models.ManyToManyField(Book)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

