from django.db import models

class Instrument(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class Genre(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class Band(models.Model):
    name = models.CharField(max_length=200)
    founded = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.name