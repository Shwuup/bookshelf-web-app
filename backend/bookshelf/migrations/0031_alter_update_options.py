# Generated by Django 3.2.6 on 2021-08-30 10:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('bookshelf', '0030_alter_update_options'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='update',
            options={'ordering': ['-timestamp']},
        ),
    ]
