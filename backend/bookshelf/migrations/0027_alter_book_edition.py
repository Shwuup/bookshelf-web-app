# Generated by Django 3.2.6 on 2021-08-29 06:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bookshelf', '0026_auto_20210828_1158'),
    ]

    operations = [
        migrations.AlterField(
            model_name='book',
            name='edition',
            field=models.PositiveIntegerField(null=True),
        ),
    ]