from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .serializers import UserSerializer

# Create your views here.

@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    print("Registration data received:", request.data)  # Debug print
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        return Response({
            'status': 'success',
            'user': serializer.data,
            'tokens': {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }
        }, status=status.HTTP_201_CREATED)
    print("Registration validation errors:", serializer.errors)  # Debug print
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def login_user(request):
    print("Login data received:", request.data)  # Debug print
    username = request.data.get('username')
    password = request.data.get('password')
    
    user = authenticate(username=username, password=password)
    if user:
        refresh = RefreshToken.for_user(user)
        return Response({
            'status': 'success',
            'tokens': {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            },
            'username': user.username
        })
    return Response({
        'status': 'error',
        'detail': 'Invalid credentials'
    }, status=status.HTTP_401_UNAUTHORIZED)
