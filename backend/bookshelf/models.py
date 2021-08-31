from django.db import models
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
import json

# Create your models here.


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)


class Author(models.Model):
    author_id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)

    def __str__(self):
        return "{} {}".format(self.first_name, self.last_name)


class Publisher(models.Model):
    publisher_id = models.AutoField(primary_key=True)
    publisher_name = models.CharField(max_length=100)

    def __str__(self):
        return self.publisher_name


class Genre(models.Model):
    genre_id = models.AutoField(primary_key=True)
    genre_name = models.CharField(max_length=100)

    def __str__(self):
        return self.genre_name


class Book(models.Model):
    book_id = models.AutoField(primary_key=True)
    isbn = models.CharField(max_length=200)
    title = models.CharField(max_length=200)
    author = models.ManyToManyField(Author)
    publisher = models.ForeignKey(Publisher, null=True, on_delete=models.CASCADE)
    genre = models.ManyToManyField(Genre)
    pub_date = models.DateField("date published")
    pages = models.PositiveIntegerField()
    language = models.CharField(max_length=200, default="")
    image_url = models.CharField(max_length=200, default="")
    edition = models.CharField(max_length=80, default="", null=True)
    blurb = models.TextField(default="")

    def __str__(self):
        return self.title


# same fields as Update but only unique entries compared to Update which can have multiple of the "same" update
class BookStatus(models.Model):
    book_status_id = models.AutoField(primary_key=True)
    status = models.CharField(max_length=20)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    rating = models.PositiveIntegerField(default=0)
    timestamp = models.PositiveBigIntegerField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return json.dumps(
            {
                "book_status_id": self.book_status_id,
                "status": self.status,
                "book": self.book.title,
                "rating": self.rating,
            },
        )


class Update(models.Model):
    update_id = models.AutoField(primary_key=True)
    type = models.CharField(max_length=20)
    timestamp = models.PositiveBigIntegerField()
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    rating = models.PositiveIntegerField(null=True, default=0)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        ordering = ["-timestamp"]
