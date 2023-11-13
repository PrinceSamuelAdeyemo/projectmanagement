############### DJANGO DEFAULT LIBRARIES/IMPORTS ##################
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages, auth
from django.contrib.auth.models import User
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views import View
from django.http import HttpResponse, JsonResponse
from django.contrib import messages

################# SERIALIZERS ####################
from .serializers import LoginSerializer, UserSerializer, ProfileSerializer, BusinessProfileSerializer, ProjectSerializer, BoardSerializer, \
    CreateUserSerializer, LoginViewSerializer, UserStatusSerializer

################ REST FRAMEWORK LIBRARIES #################
from rest_framework import status
from rest_framework.serializers import Serializer
from rest_framework.authentication import authenticate, SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView, UpdateAPIView, DestroyAPIView
from rest_framework import status

############### KNOX LIBRARIES
from knox.auth import TokenAuthentication
from knox.models import AuthToken
from knox import views as knox_views

########### MODEL VIEW IMPORTS ##################
from .models import Profile, BusinessProfile, Project, Board, Task, Test

############# PYTHON LIBRARIES ##############
import json
import socketio


#from backend.signals import (userLoggedIn)

# Create your views here.

class UserStatus(APIView):
    query_set = User.objects.all()
    serializer_class = UserStatusSerializer
    
    def get(self, request):
        #serializer = self.serializer_class(data = request.data)
        #serializer.is_valid(raise_exception = True)
        #userLoggedIn.send('h')
        
        print(self.request.user, "\n"*10)
        return Response(self.request.user)
        

class ReturnProfile(APIView):
    #authentication_classes = (TokenAuthentication,)
    #permission_classes = (IsAuthenticated,)
    
    def get(self, request):
        
        queryset = User.objects.all()
        serializer_class = UserSerializer(queryset, many=True)
        
        profile_queryset = Profile.objects.all()
        profile_serializer_class = ProfileSerializer(profile_queryset, many=True)
        
        return Response(data = serializer_class.data)
        
    
    def post(self, request):
        return Response('Received')

##### Authenticating users ########
class CreateUser(CreateAPIView):
   queryset = User.objects.all()
   serializer_class = CreateUserSerializer
   permission_classes = (AllowAny,)
   
   
class LoginView(knox_views.LoginView):
    serializer_class = LoginViewSerializer
    permission_classes = (AllowAny,)
    authentication_classes = [BasicAuthentication]
    
    def post(self, request, format = None):
        serializer = self.serializer_class(data = request.data)
        if serializer.is_valid(raise_exception = True):
            user = serializer.validated_data['user']
            user.is_active = True
            auth.login(request, user)
            
            response = super().post(request, format = None)
            
        else: 
            return Response({'errors': serializer.errors}, status = status.HTTP_400_BAD_REQUEST)
        
        return Response({'message': response.data}, status = status.HTTP_200_OK)
            

###### Sign up view ######
class Signup(APIView):
    
    def get(self, request):
        queryset = Profile.objects.all()
        serializer_class = ProfileSerializer(queryset, many=True)
        
        return Response(serializer_class.data)
    
    def post(self, request):
        sender = request.data.pop('sender')
        #sender = 'business'
        if sender == 'personal':
            
            serializer = ProfileSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(f'{serializer.errors} \n {sender} {request.data}')
            
        elif sender == 'business':
           
            serializer = BusinessProfileSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(f'{serializer.errors} \n {sender} {request.data}')
        
        else:
            return Response(f'Not Personal and Business {request.data}')
        

class BoardsRequest(APIView):

    def get(self, request):
        query_set = Board.objects.all()
        serializer = BoardSerializer(query_set, many=True)
        total_count = Board.objects.count()
        # Emit the count to the Socket.IO server
        self.send_data_to_frontend()
        return Response({'total_count': total_count})
    
    '''
        if userserializer.is_valid(): # and profileserializer.is_valid():
            userserializer.save()
            if profileserializer.is_valid():
                profileserializer.save()
                return Response(f'From profileserializers saved, {profileserializer.data}')
            else:
                return Response(f'From profileserializers not saved, {profileserializer.errors}')
            #profileserializer.save()
            return Response(f'Saved {userserializer.data}')
        
        elif not userserializer.is_valid():
            return Response(f'From userserializers, {userserializer.errors}')
            
            
        elif not profileserializer.is_valid():
            return Response(f'From profileserializers, {profileserializer.errors}')
            
        else:
            return Response("Not just saved")
        
        
        if userserializer.is_valid():
            userserializer.save()
            profileserializer.save()
            return Response((userserializer.data, profileserializer.data))
        
        else:
            return Response((userserializer.errors, profileserializer.errors))
'''

'''
class Signup(View):
    
    global user_objects
    user_objects = User.objects.all()
    
    def get(self, request):
        return render(request, 'signup.html')
    
    def post(self, request):
        if 'personalSignupSubmit' in request.POST:
            #return HttpResponse("personal")
        
            username = request.POST['username'].lower()
            firstName = request.POST['firstName'].lower()
            middleName = request.POST['middleName'].lower()
            lastName = request.POST['lastName'].lower()
            email = request.POST['email'].lower()
            password = request.POST['password']
            password2 = request.POST['password2']
            
            required_fields = [username, firstName, middleName, lastName, email, password, password2]
            
            #for each_field in required_fields:
            if any(each_field == '' for each_field in required_fields):
                return redirect('/')
                    
                
            else:
                if User.objects.filter(username = username).exists():
                        messages.warning(request, "Username is taken!")
                    
                else:
                    if password == password2:
                        
                        user_model = User.objects.create_user(username = username, first_name = firstName, last_name = lastName, email = email, password = password)
                        user_model.save()
                        
                        user_profile = Profile.objects.create(personal_basicdetails = user_model, id_profile = user_model.id)
                        authenticated_user = auth.authenticate(request, username = username, password = password)
                        auth.login(request, authenticated_user)
                        return redirect('/dashboard')
                        
                        
                    else:
                        messages.warning(request, "Passwords don't match!")
        
        elif 'businessSignupSubmit' in request.POST:
            username = request.POST['username'].lower()
            companyName = request.POST['companyName']
            companyNameabbr = request.POST['companyNameabbr'].lower()
            email = request.POST['businessemail'].lower()
            password = request.POST['password']
            password2 = request.POST['password2']
            
            required_fields = [username, companyName, email, password, password2]
            
            if any(each_field == '' for each_field in required_fields):
                return redirect('/')
            
            else:
                if User.objects.filter(username = username).exists():
                    messages.warning(request, "Username is taken!")
                    
                else:
                    if password == password2:
                        user_model = User.objects.create_user(username = username, first_name = companyName, last_name = companyNameabbr, email = email, password = password)
                        user_model.save()
                        #userr = user_model.remove(task_id)
                        business_profile = BusinessProfile.objects.create(business_basicdetails = user_model, businessprofile_id = user_model.id)
                        authenticated_user = auth.authenticate(request, username = username, password = password)
                        auth.login(request, authenticated_user)
                        return redirect('/dashboard')
                    
                    else:
                        messages.warning(request, "Passwords don't match!")
                
        else:
            return render(request, 'login.html')
            
'''        
###### Log in view ######
class Login(APIView):
    #authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = LoginSerializer
    
    def get(self, request):
        content = {
            'user': str(request.user),
            'auth': str(request.auth)
        }
        
        return Response(content)
    
    def post(self, request):
        
        serializer = LoginSerializer(data = request.data)
        serializer.is_valid(raise_exception = True)
        
        sender = request.data['sender']
        if sender == 'personal':
            #r = request.data['user']['email']
            #return Response(r)
            
            #username = request.data.user['username']
            email = request.data['email']
            password = request.data['password']
            
            auth_user = auth.authenticate(request, username=User.objects.get(email = email), password=password)
            if auth_user is not None:
                auth.login(request, auth_user)
                return Response('Authenticated')

            else:
                return Response('Not Authenticated')
            
        elif sender == 'business':
           
            username = request.data['username']
            email = request.data['email']
            password = request.data['password']
            
            auth_user = auth.authenticate(request, username=User.objects.get(email = email), password=password)
            if auth_user is not None:
                return Response('Authenticated')
            else:
                return Response('Not Authenticated')
      
        
        # Login with username and token generated
        # Feature will be added later
        """
        user = serializer.validated_data['user']
        token = serializer.validated_data['token']
        
        return Response({
            'user': user.pk, 
            'token': token
            })
        """
        
        """
        print(request.data)
        sender = request.data.pop('sender')
        #sender = 'business'
        if sender == 'personal':
            #r = request.data['user']['email']
            #return Response(r)
            
            #username = request.data.user['username']
            email = request.data['email']
            password = request.data['password']
            
            auth_user = auth.authenticate(request, username=User.objects.get(email = email), password=password)
            if auth_user is not None:
                auth.login(request, auth_user)
                return Response('Authenticated')

            else:
                return Response('Not Authenticated')
            
        elif sender == 'business':
           
            username = request.data['username']
            email = request.data['email']
            password = request.data['password']
            
            auth_user = auth.authenticate(request, username=User.objects.get(email = email), password=password)
            if auth_user is not None:
                return Response('Authenticated')
            else:
                return Response('Not Authenticated')
                """
                
                
        '''
    
    
    def post(self, request):
        if "personalSignin" in request.POST:
            
            email = request.POST['email']
            password = request.POST['password']
            
            if (email == '' or email == None) and (password != '' or password != None):
                messages.info(request, "Please input username")
                return redirect('login')
            
            elif (email != '' or email != None) and (password == '' or password == None):
                messages.info(request, "Please input password")
                return redirect('login')
            
            elif (email == '' or email == None) and (password == '' or password == None):
                messages.info(request, "Please input details")
                return redirect('login')
            
            if User.objects.filter(email = email).exists():
                user_objectfilter = User.objects.filter(email = email)
                try:
                    user_object = User.objects.get(email = email)
                    user_profile = Profile.objects.get(personal_basicdetails = user_object)
                    if user_profile:
                        authenticated_user = auth.authenticate(request, username = User.objects.get(email = email), password = password)
                        if authenticated_user != None:
                            auth.login(request, authenticated_user)
                            return redirect('/dashboard')
                        else:
                            messages.info(request, "Profile does not exist!")
                            return redirect('/login')
                        
                    else:
                        messages.info(request, "Profile does not exist!")
                        return redirect('/login')
                    
                except Profile.DoesNotExist:
                    messages.info(request, "Profile does not exist!")
                    return redirect('/login')
                    
                    
            elif User.DoesNotExist:
                messages.info(request, "User does not exist!")
                return redirect('/login')
            
        elif "businessSignin" in request.POST:
            
            email = request.POST['businessemail']
            password = request.POST['businesspassword']
            
            if (email == '' or email == None) and (password != '' or password != None):
                messages.info(request, "Please input username")
                return redirect('login')
            
            elif (email != '' or email != None) and (password == '' or password == None):
                messages.info(request, "Please input password")
                return redirect('login')
            
            elif (email == '' or email == None) and (password == '' or password == None):
                messages.info(request, "Please input details")
                return redirect('login')
            
            if User.objects.filter(email = email).exists():
                user_objectfilter = User.objects.filter(email = email)
                try:
                    user_object = User.objects.get(email = email)
                    business_profile = BusinessProfile.objects.get(business_basicdetails = user_object)
                    if business_profile:
                        authenticated_user = auth.authenticate(request, username = User.objects.get(email = email), password = password)
                        if authenticated_user != None:
                            auth.login(request, authenticated_user)
                            return redirect('/dashboard')
                        else:
                            messages.info(request, "Business Profile does not exist!")
                            return redirect('/login')
                        
                    else:
                        messages.info(request, "Business Profile does not exist!")
                        return redirect('/login')
                    
                except Profile.DoesNotExist:
                    messages.info(request, "Business Profile does not exist!")
                    return redirect('/login')
                
            
            elif User.DoesNotExist:
                messages.info(request, "User does not exist!")
                return redirect('/login')
            
        else:
                return HttpResponse('None of the personal and business login works!')
        '''
    
###### Log out view ######
@login_required(login_url='login')    
def logout(request):
    auth.logout(request)
    return render(request, 'login.html')

#@login_required(login_url = "login")


###### Homepage view ######
class Index(View):
    def get(self, request):
        return render(request, 'homepage.html')
    
    def post(self, request):
        pass
    
    
    
def getActivities(request):
    if request.method == 'GET' and request.headers.get('x-requested-with') == 'XMLHttpRequest':
        boardOwner = request.user.username
        user_model = User.objects.get(username = boardOwner)
        activities = Board.objects.all()
        user_activities = Board.objects.filter(board_owner = boardOwner)
        user_activities_completed = Board.objects.filter(board_owner = boardOwner, board_completed = True, board_inprogress = False)
        user_activities_progress = Board.objects.filter(board_owner = boardOwner, board_completed = False, board_inprogress = True)
        user_activities_notstarted = Board.objects.filter(board_owner = boardOwner, board_completed = False, board_inprogress = False)
        try:
            profile = Profile.objects.get(personal_basicdetails = user_model)
            #activities = Board.objects.filter(task_owner = taskOwner).order_by('task_dateUpdated')
            activities = Board.objects.all()
            return HttpResponse("Return in personal")
        
        except Profile.DoesNotExist:
            profile = BusinessProfile.objects.get(business_basicdetails = user_model)
            #activities = Board.objects.filter(task_owner).order_by('task_dateUpdated')
            activities = Board.objects.all()
            return HttpResponse("Return in personal")
        
        finally:
            
                
            #context = {'profile': profile, 'activities': activities, 'user_activities': user_activities, 
            #           'user_activities_completed': user_activities_completed, 'user_activities_progress': user_activities_progress, 
            #           'user_activities_notstarted': user_activities_notstarted,}
            
            return JsonResponse({
                #'profile': profile, 
                'activities': list(activities.values()), 
                'user_activities': list(user_activities.values()), 
                'user_activities_completed': list(user_activities_completed.values()), 
                'user_activities_progress': list(user_activities_progress.values()), 
                'user_activities_notstarted': list(user_activities_notstarted.values()),
                }, 
                                safe=False)
        #return render(request, 'todoapp.html', context=context)
                
    #else:
        #return HttpResponse("Not receiving any Django request")

###### Calendar view ######
@login_required(login_url = "login")
def calendar(request):
    return render(request, 'calendar.html')


class Activities(LoginRequiredMixin, View):
    login_url = 'login'
    redirect_field_name = 'login'
    
    def get(self, request):
        
        if (request.headers.get('x-requested-with') == 'XMLHttpRequest'):
            return render(request, 'boards.html')
            owner = request.user.username
            projects =  Project.objects.filter(project_owner = owner)
            boards = Board.objects.filter(board_owner = owner)
            
            context = {'totalprojects': list(projects.values()),
                       'totalboards': list(boards.values),
                       }
            return render(request, 'boards.html')#, context)
        else:
            return HttpResponse("Activities from ajax won't show")
        
    def post(self, request):
        if (request.headers.get('x-requested-with') == 'XMLHttpRequest'):
            return render(request, 'boards.html')
        
    

#def activities(request):
#    return render(request, 'boards.html')

@login_required(login_url = "login")
def settings(request):
    return render(request, 'settings.html')


    
###### Createtask view  from the create board button in the html ######
class DashBoard(LoginRequiredMixin, View):
    login_url = 'login'
    redirect_field_name: 'signup'
    def get(self, request):
        if request.headers.get('x-requested-with') == 'XMLHttpRequest':
            boardOwner = request.user.username
            user_model = User.objects.get(username = boardOwner)
            activities = Board.objects.all()
            user_activities = Board.objects.filter(board_owner = boardOwner)
            user_activities_completed = Board.objects.filter(board_owner = boardOwner, board_completed = True, board_inprogress = False)
            user_activities_progress = Board.objects.filter(board_owner = boardOwner, board_completed = False, board_inprogress = True)
            user_activities_notstarted = Board.objects.filter(board_owner = boardOwner, board_completed = False, board_inprogress = False)
            try:
                profile = Profile.objects.get(personal_basicdetails = user_model)
                #activities = Board.objects.filter(task_owner = taskOwner).order_by('task_dateUpdated')
                activities = Board.objects.all()
                return HttpResponse("Return in personal")
            
            except Profile.DoesNotExist:
                profile = BusinessProfile.objects.get(business_basicdetails = user_model)
                #activities = Board.objects.filter(task_owner).order_by('task_dateUpdated')
                activities = Board.objects.all()
                return HttpResponse("Return in personal")
            
            finally:
                
                    
                #context = {'profile': profile, 'activities': activities, 'user_activities': user_activities, 
                #           'user_activities_completed': user_activities_completed, 'user_activities_progress': user_activities_progress, 
                #           'user_activities_notstarted': user_activities_notstarted,}
                
                '''return JsonResponse({
                    #'profile': profile, 
                    'activities': list(activities.values()), 
                    'user_activities': list(user_activities.values()), 
                    'user_activities_completed': list(user_activities_completed.values()), 
                    'user_activities_progress': list(user_activities_progress.values()), 
                    'user_activities_notstarted': list(user_activities_notstarted.values()),
                    }, 
                                    safe=False)'''
                return render(request, 'dashboard.html')
                
        else:
            return HttpResponse("Ajax not responding")
    
    def post(self, request):
        
        #if 'createtask' in request.POST:
        if (request.headers.get('x-requested-with') == 'XMLHttpRequest'):
            pass
            #return HttpResponse(request.headers)
            '''
            if 'None':
                return HttpResponse('Response is None')
            else:
                return HttpResponse('Response is Not none')
            #return HttpResponse("Sent")
            
            # Get the user and board details from the front end.
            user = request.user.username
            
            taskOwner = request.user.username
            taskName = request.POST['task_name']
            
            taskDescription = request.POST['task_description']
            
            task_names = request.POST.getlist("TaskArray[]")
            #task_names = json.loads(request.)
            
            #print(alltask_names)
            #task_names = [alltask_names]
            #task_file
            #task_image
            #task_done
            #task_name = ''
            
            # Check and access the profile of the user gotten from the front end.
            personal_model = User.objects.filter(username = user).first()
            personal_profile = Profile.objects.get(personal_basicdetails = personal_model)
            #if personal_model.exists():
            #return HttpResponse(f"{personal_model}")
            
            # Check if the board name received already exists.
            # If it does not exists, create the board and save it.
            # After the save, get the board which was saved and check if if the sub board was added, if it wasn't. Don't save any task, but if the sub board was added.
            #  Check if the sub board exists for the partcular board, if not, Save the tasks also.
            
            checkpersonal_task = Board.objects.filter(personalTaskowner = personal_profile, task_name = taskName, task_description = taskDescription).exists()
            if not checkpersonal_task:
                task_model = Board.objects.create(personalTaskowner = personal_profile, task_owner = user, task_name = taskName, task_description = taskDescription)
                task_model.save()
                
                #if task_model.save() == True:
                
                #personal_task = Board.objects.get(personalTaskowner = personal_profile, task_name = taskName, task_description = taskDescription)
                #personal_task = Board.objects.get_or_create(personalTaskowner = personal_profile, task_owner = user, task_name = taskName, task_description = taskDescription)

                if (task_names == '' or task_names == [] or len(task_names) == 0):
                    return HttpResponse('empty')
                
                else:
                    personal_task = Board.objects.get(personalTaskowner = personal_profile, task_name = taskName, task_description = taskDescription)
           
                    
                    #task_name = task_names.split(',')
                    #print(task_name)
                    for eachtask in range(len(task_names)):
                        #return HttpResponse()
                        checktask_namemodel = Task.objects.filter(task_parent = personal_task, task_name = task_names[eachtask]).exists()
                        if checktask_namemodel:
                            return HttpResponse("Can't save, exist")
                        else:
                            for eachtask in range(len(task_names)):
                                task_name_model = Task.objects.create(task_parent = personal_task, task_name=task_names[eachtask])
                                task_name_model.save()
                            return HttpResponse('Exists, but saved task')
                
            else:
                personal_task = Board.objects.get(personalTaskowner = personal_profile, task_name = taskName, task_description = taskDescription)
           
                if (task_names == '' or task_names == [] or len(task_names) == 0):
                    return HttpResponse('Empty task')
                else:
                    #task_name = task_names.split(',')
                    #print(task_name)
                    for eachtask in range(len(task_names)):
                        #return HttpResponse()
                        checktask_namemodel = Task.objects.filter(task_parent = personal_task, task_name = task_names[eachtask]).exists()
                        if checktask_namemodel:
                            return HttpResponse("Can't save, exist")
                        else:
                            for eachtask in range(len(task_names)):
                                task_name_model = Task.objects.create(task_parent = personal_task, task_name=task_names[eachtask])
                                task_name_model.save()
                            return HttpResponse('Exists, but saved task')
                    
            
        else:
            return HttpResponse("Not create board")'''
         
'''            
def add_record(request):
    data = {
        "title": request.POST.get('title', None),
        }
    serializer = self.serializer_class(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(data=serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
'''


###### CreateProject view  from the create project button in the html ######
class CreateProject(LoginRequiredMixin, View):
    login_url = 'login'
    redirect_field_name: 'login'
    
    def get(self, request):
        return render(request, 'createboard.html')
    
    def post(self, request):
        
        ################################################
        # Receive the project details
        if (request.headers.get('X-Requested-With') == 'XMLHttpRequest') and (request.POST['action'] == "create-a-project"): 
            projectOwner = request.user.username
            projectName = request.POST['project_name']
            projectDescription = 'Default'
            #task_name = request.POST["taskinput"]
            # Receive the board details
            #boardName = request.POST['board_name']
            #  Receive the task details
            ################################################
            # Working on the details provided
            
            personal_model = User.objects.filter(username = projectOwner).first()
            personal_profile = Profile.objects.get(personal_basicdetails = personal_model)
            
            checkpersonal_project = Project.objects.filter(personalProjectowner = personal_profile, project_name = projectName).exists()
            
            if checkpersonal_project:
                return HttpResponse("This project already exist")
                #personal_project = Project.objects.get(personalProjectowner = personal_profile, project_name = projectName, project_description = projectDescription)
                
        
            else:
                project_model = Project.objects.create(personalProjectowner = personal_profile, project_owner = projectOwner, project_name = projectName, project_description = projectDescription)
                project_model.save()
                return HttpResponse("This project has been saved.")
            
                    
                #personal_board = Board.objects.get(personalBoardowner = personal_profile, board_name = boardName, board_description = boardDescription)
                #personal_board = Board.objects.create(board_name, board_project, board_description)
                #personal_board.save()
                
                #task_name_model = Task.objects.create(task_parent = personal_board, task_name=task_name)
                #task_name_model.save()
                
                #return HttpResponse('Success')
                
            # else:
                #  pass
                #messages.info(request, 'Please enter a board name')
            
            


###### CreateBoard view  from the create board button in the html ######
class CreateBoard(LoginRequiredMixin, View):
    login_url = 'login'
    redirect_field_name: 'login'
    
    def get(self, request):
        return render(request, 'createboard.html')
    
    def post(self, request):
        
        if (request.headers.get('X-Requested-With') == 'XMLHttpRequest') and (request.POST['action'] == "create-a-board"):
            
            ################################################
            #Receive the project details
            projectName = request.POST['project_name']
            #projectDescription = 'Default'
            
            # Receive the board details
            boardOwner = request.user.username
            boardName = request.POST['board_name']
            boardDescription = request.POST['board_description']
            
            ################################################
            # Receive the task details
            task_names = request.POST.getlist("TaskArray[]")
            
            ##### Get if the board exist, and then create if it doesn't exist ########
            # Check if the board name received already exists.
            # If it does not exists, create the board and save it.
            # After the save, get the board which was saved and check if if the sub board was added, if it wasn't. Don't save any task, but if the sub board was added.
            #  Check if the sub board exists for the partcular board, if not, Save the tasks also.
            personal_model = User.objects.filter(username = boardOwner).first()
            personal_profile = Profile.objects.get(personal_basicdetails = personal_model)
            
            checkpersonal_board = Board.objects.filter(personalBoardowner = personal_profile, board_name = boardName, board_description = boardDescription).exists()
            if not checkpersonal_board:
                
                personal_board = Board.objects.create(personalBoardowner = personal_profile, board_name = boardName, board_description = boardDescription)
                personal_board.save()
                if (task_names == ''):
                    return HttpResponse('The board task is empty!')
                else:                
                    for eachtask in range(len(task_names)):
                        personal_task = Board.objects.get(personalBoardowner = personal_profile, board_name = boardName, board_description = boardDescription)
                        checktask_namemodel = Task.objects.filter(task_parent = personal_task, task_name = task_names[eachtask]).exists()
                        if checktask_namemodel:
                            return HttpResponse("Can't save, exist")
                        else:
                            task_name_model = Task.objects.create(task_parent = personal_task, task_name=task_names[eachtask])
                            task_name_model.save()
                    return HttpResponse('Board Exists, but saved task')
                    
            else:
                return HttpResponse('The board name already exists')
            
        else:
            return HttpResponse('It is not there')
        if "None":
            return HttpResponse('It is None')
        else:
            user = request.user.username
            taskOwner = request.user.username
            taskName = request.POST['task_name']
            taskDescription = request.POST['task_description']
            task_model = Board.objects.create(personalTaskowner = personal_profile, task_owner = user, task_name = taskName, task_description = taskDescription)
            task_model.save()
            
            return HttpResponse('Success')
        
            
def calculator(request):
    return render(request, 'calculator.html')

def createtask(request):
    return render(request, 'createboard.html')

def error_404_view(request, exception):
    return render(request, '404.html')