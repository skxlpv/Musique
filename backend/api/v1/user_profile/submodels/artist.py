from django.db import models

class Style(models.Model):
    name = models.CharField(max_length=100, unique=True)


class Medium(models.Model):
    name = models.CharField(max_length=100, unique=True)


class Exhibition(models.Model):
    artist = models.ForeignKey('Artist', on_delete=models.CASCADE, related_name='exhibitions')
    title = models.CharField(max_length=200)
    date = models.DateField()
    location = models.CharField(max_length=200)
