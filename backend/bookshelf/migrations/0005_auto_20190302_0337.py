# Generated by Django 2.2b1 on 2019-03-02 03:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("bookshelf", "0004_auto_20190302_0333"),
    ]

    operations = [
        migrations.AlterField(
            model_name="book",
            name="pub_date",
            field=models.DateField(verbose_name="date published"),
        ),
    ]
