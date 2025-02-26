# serializers.py
from django.contrib.auth import authenticate, get_user_model
from django.contrib.auth.handlers.modwsgi import check_password
from rest_framework import serializers

from api.v1.files.models import FileModel
from api.v1.users.models import CustomUser

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = CustomUser(
            username=validated_data['username'],
            email=validated_data['email'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


class LoginSerializer(serializers.Serializer):
    class Meta:
        model = CustomUser
        fields = ['username', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True)

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')

        user = CustomUser.objects.filter(username=username).first()
        status = check_password()

        print(username, password)

        if username and password:
            user = authenticate(request=self.context.get('request'),
                                username=username, password=password)
            print(user)
            if user is None:
                raise serializers.ValidationError("Invalid username or password")
        else:
            raise serializers.ValidationError("Must provide both username and password")

        data['user'] = user
        return data


class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = FileModel
        fields = ['file', 'uploaded_at', 'user', 'type']
