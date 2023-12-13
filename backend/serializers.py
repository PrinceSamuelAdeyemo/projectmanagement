from rest_framework import serializers
from rest_framework.authtoken.models import Token

from knox.models import AuthToken

from django.contrib.auth.models import User
from django.contrib import auth
from django.contrib.auth import authenticate
from .models import Profile, BusinessProfile, Project, Board, Card, Task, Test




class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        #fields = ['id', 'username', 'password', 'first_name', 'last_name', 'email']
        #extra_kwargs = {'password': 
        #    {'write_only': True}
        #    }
        
    def validate(self, attrs):
        username = attrs.get("username")
        if username:
            return username
            
        #email = attrs.get('email')
    """
    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        #Token.objects.create(user = user)
        return user
    """

class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"
        extra_kwargs = {
            'password': {
                'write_only': True
            }
        }
        
    def validate(self, attrs):
        username = attrs.get('username').lower()
        email = attrs.get('email', '').strip().lower()
        password = attrs.get('password')
        first_name = attrs.get('first_name').lower()
        last_name = attrs.get('last_name').lower()
        
        if not username or not email or not password:
            raise serializers.ValidationError('Incomplete signup details')
        
        if User.objects.filter(username=username).exists():
            raise serializers.ValidationError('An account with this username exists in our record.')
        
        if User.objects.filter(email = email).exists():
            raise serializers.ValidationError('An account with this email exists in our record.')
        
        return attrs
    
    def create(self, validated_data):
        password = validated_data.pop('password')
        groups = validated_data.pop('groups', None)
        permissions = validated_data.pop('user_permissions', [])
        
        user = User.objects.create_user(**validated_data, password = password)
        
        user.is_active = True
        if groups:
            user.groups.set(group)
            
        user.user_permissions.set(permissions)
        
        user.save()
        return user

class ProfileSerializer(serializers.ModelSerializer):
    user = CreateUserSerializer()
    
    class Meta:
        model = Profile
        fields = ['user', 'middle_name', 'country']
        #['id', 'username', 'password', 'first_name', 'last_name', 'email', 'is_staff', 'is_active', 'date_joined', 'user']

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user_serializer = CreateUserSerializer(data=user_data)
        user_serializer.is_valid(raise_exception=True)
        
        user = user_serializer.save()
        profile_id = User.objects.get(username=user.username).id
        #user.is_active = True
        profile = Profile.objects.create(user = user, profile_id=profile_id, **validated_data)
        #profile = Profile.objects.create(user=user, middle_name=validated_data.pop('middle_name'), country=validated_data.pop('country'))
        return profile

class BusinessProfileSerializer(serializers.ModelSerializer):
    business_basicdetails = CreateUserSerializer()
    
    class Meta:
        model = BusinessProfile
        fields = ['business_basicdetails', 'business_name', 'business_country']  
        # '__all__'
        
    def create(self, validated_data):
        user_data = validated_data.pop('business_basicdetails')
        user_serializer = CreateUserSerializer(data = user_data)
        user_serializer.is_valid(raise_exception=True)
        user = user_serializer.save()
        profile = BusinessProfile.objects.create(business_basicdetails=user, **validated_data)
        
        return profile

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'
        
class BoardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Board
        fields = '__all__'

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'
        
        
        
########## Login Serializer ##############
class LoginSerializer(serializers.Serializer):
    
    #username = serializers.CharField(max_length = 256)
    email = serializers.EmailField()
    password = serializers.CharField(style={"input_type": 'password'}, trim_whitespace=False)
    
    def validate(self, attrs):
        email =attrs.get("email").lower()
        password = attrs.get("password")
        
        if not email or not password:
            raise serializers.ValidationError("Please give email and password")
        
        if User.objects.filter(email=email).exists():
            user = authenticate(request=self.context.get("request"), email = email, password = password)
            
            if not user:
                raise serializers.ValidationError("Wrong credentials")
            
            attrs['user'] = user
            return attrs
            
    #    #user = auth.authenticate(request, username = User.objects.get(email = email), password = password)
    #    #return user
        
    #    
    """
        if data.username != None:
            user = auth.authenticate(request, username = username, password = password)
            if not user:
                return serializers.ValidationError('Invalid credential')
            
            else:
                token = AuthToken.objects.create(user)
                tokenResponse = {'user': user, 'token': token}
                return tokenResponse
                
        elif data.email != None:
            user = auth.authenticate(request, username = User.objects.get(email = email), password = password)
            if not user:
                return serializers.ValidationError('Invalid credential')
            
            else:
                token = AuthToken.objects.create(user)
                tokenResponse = {'user': user, 'token': token}
                return tokenResponse
        """    
class LoginViewSerializer(serializers.Serializer):
    username = serializers.CharField(required=False)
    email = serializers.EmailField(required=False)
    password = serializers.CharField(style={'input-type': 'password'}, trim_whitespace = False)
    
    def validate(self, attrs):
        try:
            #attrs.get('username'):=
            username = attrs.get('username').lower()
            email = None
            
        except:
            username = None
            email = attrs.get('email').lower()
        
        #if attrs.get('email'):
        #    email = attrs.get('email').lower()
        finally:
            password = attrs.get('password')
        
        # This condition is to check if any of the required fields were submitted blanked.
        if (not username and not email) or (not password):
            raise serializers.ValidationError('Please input necessary login details')
        
        # This condition is to check if any both of the username and password fields were filled but not the email
        if (username and password) or not email:
            
            if not User.objects.filter(username = username).exists():
                raise serializers.ValidationError('This username does not exist in our record, please try logging in with your email if you may have forgotten your username') 
            user = auth.authenticate(request=self.context.get('request'), username = username, password=password)
            
            if not user:
                raise serializers.ValidationError('Invalid login details')
        
        # This condition is to check if any both of the email and password fields were filled but not the username
        elif (email and password) or not username:
            if not User.objects.filter(email = email).exists():
                raise serializers.ValidationError('This email does not exist in our record, please try logging in with your username if you may have forgotten your email')
            user = auth.authenticate(request=self.context.get('request'), username = User.objects.get(email = email), password=password)
            #user = auth.authenticate(request=self.context.get('request'), email = email, password = password)
            if not user:
                raise serializers.ValidationError('Invalid login details')
            
        attrs['user'] = user
        return attrs
            
        
        '''
        if not email or not password:
            raise serializers.ValidationError('Please provide both email and password')
        
        if not User.objects.filter(email = email).exists():
            raise serializers.ValidationError('This email does not exist in our database, please check and try again!')
        
        user = auth.authenticate(request = self.context.get('request'), username = User.objects.get(email = email), password = password)
        if not user:
            #raise serializers.errors()
            raise serializers.ValidationError('Invalid login details')
        attrs['user'] = user
        
        return attrs
        
        '''
        
class UserStatusSerializer(serializers.Serializer):
    
    def validate(self, attrs):
        pass

class CreateBoardSerializer(serializers.ModelSerializer):
    """
    board_owner = serializers.SlugRelatedField(
        #many = True, 
        read_only= True,
        slug_field = "username"
    )
    """
    #board_owner = serializers.StringRelatedField()
    #board_owner = serializers.PrimaryKeyRelatedField(read_only=True)
    #board_owner = UserSerializer(many=True, read_only=True)
    class Meta:
        model = Board
        fields = ["board_name", "board_description", "board_owner", "board_id"]
        
        
    def validate(self, attrs):
        board_name = attrs.get("board_name")
        board_owner = attrs.get("board_owner")
        
        if board_name != '':
            return attrs
        
    def create(self, validated_data):
        
        board_name = validated_data["board_name"]
        board_description = validated_data["board_description"]
        board_owner = validated_data["board_owner"]
        #tasks = validated_data["tasks"]        
        #task_names = request.POST.getlist("TaskArray[]")
        
        #boardO = UserSerializer(data = board_owner)
        #boardO.is_valid(raise_exception=True)
        #boardOw = boardO.save()
        
        board = Board.objects.create(board_name=board_name, board_description=board_description, board_owner=board_owner)
        
        
        return board
    
class CreateCardSerializer(serializers.ModelSerializer):
    #card_parent = serializers.SlugRelatedField(slug_field="card_parent", read_only=True)
    class Meta:
        model = Card
        fields = ["card_name", "card_parent", "card_id"] #"__all__"
        
    def validate(self, attrs):
        if attrs.get("card_name") != '':
            return attrs
        print("eeeeeeee",attrs)
    
    def create(self, validated_data):
        card = Card.objects.create(card_name = self.validated_data["card_name"], card_parent=self.validated_data["card_parent"])
        new_card_details = {
            "card_name": card.card_name,
            "card_id": card.card_id,
            "card_parent": card.card_parent,
        }
        return new_card_details
    
class CreateTaskSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Task
        fields = [""]