# Generated by Django 5.0.3 on 2024-11-22 18:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_userpost_ispublic'),
    ]

    operations = [
        migrations.AddField(
            model_name='userpost',
            name='profile_picture',
            field=models.ImageField(default=None, upload_to='profile_pics/'),
        ),
    ]
