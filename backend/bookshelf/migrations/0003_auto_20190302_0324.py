# Generated by Django 2.2b1 on 2019-03-02 03:24

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('bookshelf', '0002_auto_20190301_0243'),
    ]

    operations = [
        migrations.AddField(
            model_name='book',
            name='pages',
            field=models.PositiveIntegerField(default=None),
            preserve_default=False,
        ),
        migrations.CreateModel(
            name='BookList',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('date_created', models.DateTimeField()),
                ('books', models.ManyToManyField(to='bookshelf.Book')),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
