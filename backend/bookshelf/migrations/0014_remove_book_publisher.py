# Generated by Django 3.0.1 on 2020-02-01 07:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('bookshelf', '0013_book_publisher_after'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='book',
            name='publisher',
        ),
    ]
