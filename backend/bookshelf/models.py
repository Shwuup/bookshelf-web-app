from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Book(models.Model):
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=200)
    publisher = models.CharField(max_length=200)
    pub_date = models.DateTimeField("date published")
    book_cover_path = models.CharField(max_length=200)
    isbn = models.CharField(max_length=200, primary_key=True)

    def __str__(self):
        return self.title

