from django.contrib import admin
from .models import Profile, BusinessProfile, Team, Membership, Project, Board, Task, Test

# Register your models here.
admin.site.register(Profile)
admin.site.register(BusinessProfile)
admin.site.register(Team)
admin.site.register(Membership)
admin.site.register(Project)
admin.site.register(Board)
admin.site.register(Task)
admin.site.register(Test)