# Generated by Django 4.1.1 on 2023-03-29 17:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0004_alter_businessprofile_business_country_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='middle_name',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
