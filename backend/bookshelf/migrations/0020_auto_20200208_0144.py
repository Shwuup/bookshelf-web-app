# Generated by Django 3.0.1 on 2020-02-08 01:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("bookshelf", "0019_auto_20200206_1003"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="booklist",
            name="books",
        ),
        migrations.AlterField(
            model_name="bookinfo",
            name="book_list",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="book_infos",
                to="bookshelf.BookList",
            ),
        ),
    ]
