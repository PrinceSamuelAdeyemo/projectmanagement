# Generated by Django 4.1.1 on 2023-12-04 23:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0016_alter_project_project_owner'),
    ]

    operations = [
        migrations.AlterField(
            model_name='board',
            name='board_owner',
            field=models.CharField(max_length=256),
        ),
    ]
