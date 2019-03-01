# Generated by Django 2.2b1 on 2019-03-01 02:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bookshelf', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='book',
            name='id',
        ),
        migrations.AddField(
            model_name='book',
            name='isbn',
            field=models.CharField(default=None, max_length=200, primary_key=True, serialize=False),
            preserve_default=False,
        ),
    ]