from django.contrib.auth.models import User
from django.db.models.signals import pre_save, post_save, pre_delete, post_delete
from django.dispatch import receiver, Signal


@receiver(post_save, sender = User)
def generateToken(sender, instance, created, *args, **kwargs):
    if created:
        user = instance.username
        