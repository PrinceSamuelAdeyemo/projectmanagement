from rest_framework import serializers
from rest_framework.authtoken.models import Token

from knox.models import AuthToken

from django.contrib.auth.models import User
from django.contrib import auth
from .models import Profile, BusinessProfile, Project, Board, Task, Test




class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        #fields = ['id', 'username', 'password', 'first_name', 'last_name', 'email']
        extra_kwargs = {'password': 
            {'write_only': True}
            }
        
    #def validate(self, attrs):
    #    email = attrs.get('email')
    
    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        #Token.objects.create(user = user)
        return user

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
    user = UserSerializer()
    
    class Meta:
        model = Profile
        fields = ['user', 'middle_name', 'country']
        #['id', 'username', 'password', 'first_name', 'last_name', 'email', 'is_staff', 'is_active', 'date_joined', 'user']

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user_serializer = UserSerializer(data=user_data)
        user_serializer.is_valid(raise_exception=True)
        user = user_serializer.save()
        profile = Profile.objects.create(user = user, **validated_data)
        #profile = Profile.objects.create(user=user, middle_name=validated_data.pop('middle_name'), country=validated_data.pop('country'))
        return profile

class BusinessProfileSerializer(serializers.ModelSerializer):
    business_basicdetails = UserSerializer()
    
    class Meta:
        model = BusinessProfile
        fields = ['business_basicdetails', 'business_name', 'business_country']  
        # '__all__'
        
    def create(self, validated_data):
        user_data = validated_data.pop('business_basicdetails')
        user_serializer = UserSerializer(data = user_data)
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
    
    username = serializers.CharField(max_length = 256)
    email = serializers.EmailField()
    password = serializers.CharField()
    
    def validate(self, data):
        user = auth.authenticate(request, username = User.objects.get(email = email), password = password)
        return user
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
                raise serializers.ValidationError('Invalid login details from username')
        
        # This condition is to check if any both of the email and password fields were filled but not the username
        elif (email and password) or not username:
            if not User.objects.filter(email = email).exists():
                raise serializers.ValidationError('This email does not exist in our record, please try logging in with your username if you may have forgotten your email')
            user = auth.authenticate(request=self.context.get('request'), username = User.objects.get(email = email), password=password)
            
            if not user:
                raise serializers.ValidationError('Invalid login details from email')
            
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
        
    
