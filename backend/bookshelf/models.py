from django.db import models
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver

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


class Book(models.Model):
    book_id = models.AutoField(primary_key=True)
    isbn = models.CharField(max_length=200)
    title = models.CharField(max_length=200)
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    publisher = models.ForeignKey(Publisher, null=True, on_delete=models.CASCADE)
    pub_date = models.DateField("date published")
    pages = models.PositiveIntegerField()
    language = models.CharField(max_length=200, default="")
    image = models.CharField(max_length=200, default="")
    edition = models.PositiveIntegerField()

    def __str__(self):
        return self.title


class BookList(models.Model):
    name = models.CharField(max_length=200)
    date_created = models.DateField(auto_now_add=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class BookInfo(models.Model):
    book_info_id = models.AutoField(primary_key=True)
    is_read = models.BooleanField(default=False)
    date_finished_reading = models.DateField(blank=True, null=True)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    book_list = models.ForeignKey(
        BookList, on_delete=models.CASCADE, related_name="book_infos"
    )

    def __str__(self):
        return "Book: {} isRead: {}".format(self.book, self.is_read)

