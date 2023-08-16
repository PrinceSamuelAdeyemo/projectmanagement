from django.urls import path
from .views import Index, Signup, Login, ReturnProfile, BoardsRequest, CreateUser, LoginView
from knox.views import LogoutView, LogoutAllView

urlpatterns = [
    #path('', Index.as_view(), name='homepage')
    path('', ReturnProfile.as_view(), name='returnprofile'),
    path('signup', Signup.as_view(), name='signup'),
    path('login', Login.as_view(), name='login'),
    
    
    path('boardsrequest', BoardsRequest.as_view(), name='boardsrequest'),
    
    
    #path('home', UserStatus.as_view(), name = 'home'),
    
    path('sign-up', CreateUser.as_view(), name= 'sign-up'),
    path('log-in', LoginView.as_view(), name= 'log-in'),
    path('log-out', LogoutView.as_view(), name = 'log-out'),
    path('log-outall', LogoutAllView.as_view(), name = 'log-outall'),
    
    
    # Url endpoint for setting and retrieving projects, boards and tasks
    #path('projectsrequest', ProjectRequest.as_view(), name='projectsrequest'),
    #path('boardsrequest', ProjectRequest.as_view(), name='boardsrequest'),
    #path('tasksrequest', ProjectRequest.as_view(), name='tasksrequest'),
]


"""
urlpatterns = [
    path('myprofile', ReturnProfile.as_view(), name='myprofile'),
    # Signup, login and other links within the page.
    path('signup', Signup.as_view(), name = 'signup'),
    path('login', Login.as_view(), name = 'login'),
    #path('logout', Logout.as_view(), name = 'logout'),
    #re_path(r'^login$', Login.as_view(), name = 'login'),
    path('dashboard', login_required(DashBoard.as_view()), name='dashboard'),
    #path('createtask', views.createtask, name="createtask"),
    
    path('', Index.as_view(), name="homepage"),
    #path('ab', Index.as_view(), name='ab'),
    path('getActivities', views.getActivities, name = 'bb'),
    path('calendar', views.calendar, name="calendar"),
    #path('activities', views.activities, name="activities"),
    path('activities', login_required(Activities.as_view()), name='activities'),
    path('settings', views.settings, name="settings"),
    path('logout', views.logout, name="logout"),
    path('calculator', views.calculator, name="calculator"),
    
    #path('add_record', views.add_record, name='add_record'),
    
    path('createproject', login_required(CreateProject.as_view()), name = 'createproject'),
    path('createboard', login_required(CreateBoard.as_view()), name = 'createboard'),
    
    path('authuser', AuththeUser.as_view(), name = 'authuser'),
    
    
    # path to links performing some activities but not opening and page.
    #Task Creation
    
]

 """