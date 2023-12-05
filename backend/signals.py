from django.contrib.auth.models import User
from django.db.models.signals import pre_save, post_save, pre_delete, post_delete, post_init
from django.dispatch import receiver
import django.dispatch

