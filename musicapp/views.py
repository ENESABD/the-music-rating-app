from django.shortcuts import render
from rest_framework import viewsets
from .serializers import UserSerializer, RatingSerializer, DetailSerializer, SongSerializer
from .models import User, Rating, Detail, Song



# Create your views here.
class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

class RatingView(viewsets.ModelViewSet):
    serializer_class = RatingSerializer
    queryset = Rating.objects.all()

class SongView(viewsets.ModelViewSet):
    serializer_class = SongSerializer
    queryset = Song.objects.all()

class DetailView(viewsets.ModelViewSet):
    serializer_class = DetailSerializer
    queryset = Detail.objects.all()
    