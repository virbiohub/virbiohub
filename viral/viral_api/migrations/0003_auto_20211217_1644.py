# Generated by Django 3.0.8 on 2021-12-17 16:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('viral_api', '0002_auto_20211210_2234'),
    ]

    operations = [
        migrations.AlterField(
            model_name='member',
            name='photo',
            field=models.FileField(upload_to='members/'),
        ),
        migrations.AlterField(
            model_name='publication',
            name='authors',
            field=models.CharField(max_length=1500),
        ),
    ]
