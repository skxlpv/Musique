from django.db import models

class TheatreRole(models.Model):
    artist = models.ForeignKey('TheatreArtist', on_delete=models.CASCADE, related_name='past_roles')
    role = models.CharField(max_length=100)
    production = models.CharField(max_length=200)
    year = models.PositiveIntegerField()


class TheatreCompany(models.Model):
    name = models.CharField(max_length=200)

class TheatrePieceGenre(models.Model):
    name = models.CharField(max_length=200)

class TheatreProject(models.Model):
    title = models.CharField(max_length=200)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    description = models.TextField(blank=True)