from rest_framework import serializers
from .models import User, Rating, Song, Detail

# The serializer translates a Todo object into a format that
# can be stored in our database. We use the Todo model.
class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ('username', 'password')

class RatingSerializer(serializers.ModelSerializer):
  class Meta:
    model = Rating
    fields = ['id','username', 'song', 'rating']

class SongSerializer(serializers.ModelSerializer):
  class Meta:
    model = Song
    fields = ('id','no','song_name', 'artist_name')

class DetailSerializer(serializers.ModelSerializer):
  class Meta:
    model = Detail
    fields = ('id', 'song', 'genre', 'year_of_release', 'duration_of_song')