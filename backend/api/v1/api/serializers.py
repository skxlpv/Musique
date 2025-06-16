# serializers.py
from __future__ import annotations

from api.v1.files.models import FileModel
from api.v1.users.models import CustomUser
from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model
from rest_framework import serializers


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['username', 'email', 'password', 'first_name', 'last_name']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = CustomUser(
            username=validated_data['username'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
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

        if username and password:
            user = authenticate(
                request=self.context.get('request'),
                username=username,
                password=password,
            )
            print(user)
            if user is None:
                raise serializers.ValidationError(
                    'Invalid username or password',
                )
        else:
            raise serializers.ValidationError(
                'Must provide both username and password',
            )

        data['user'] = user
        return data


class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = FileModel
        fields = "__all__"
