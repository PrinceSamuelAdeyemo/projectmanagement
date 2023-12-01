# Generated by Django 4.1.1 on 2023-11-22 22:40

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0012_profile_profile_id'),
    ]

    operations = [
        migrations.CreateModel(
            name='Card',
            fields=[
                ('card_id', models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False)),
                ('card_name', models.CharField(blank=True, max_length=150, null=True)),
                ('task_done', models.BooleanField(default=False)),
                ('task_date', models.DateField(auto_now_add=True, null=True)),
                ('task_dateUpdated', models.DateTimeField(auto_now=True)),
                ('card_parent', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='backend.board')),
            ],
        ),
        migrations.AlterField(
            model_name='task',
            name='task_parent',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='backend.card'),
        ),
    ]