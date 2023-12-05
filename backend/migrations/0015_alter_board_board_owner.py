# Generated by Django 4.1.1 on 2023-12-04 23:36

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('backend', '0014_rename_task_date_card_card_date_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='board',
            name='board_owner',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]