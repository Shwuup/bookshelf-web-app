# Generated by Django 3.2.6 on 2021-09-05 12:15

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('bookshelf', '0032_rename_image_book_image_url'),
    ]

    operations = [
        migrations.RenameField(
            model_name='update',
            old_name='type',
            new_name='status',
        ),
    ]