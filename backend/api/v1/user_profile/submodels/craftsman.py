from django.db import models


class Material(models.Model):
    name = models.CharField(max_length=100, unique=True)

class Workshop(models.Model):
    craftsman = models.ForeignKey('Craftsman', on_delete=models.CASCADE, related_name='workshops')
    title = models.CharField(max_length=200)
    date = models.DateField()
    location = models.CharField(max_length=200)
    description = models.TextField()