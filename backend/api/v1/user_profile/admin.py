from django.contrib import admin

from api.v1.user_profile.models import UserProfile, Musician, Artist, TheatreArtist, Writer, Craftsman

# Register your models here.
admin.site.register(UserProfile)
admin.site.register(Musician)
admin.site.register(Artist)
admin.site.register(TheatreArtist)
admin.site.register(Writer)
admin.site.register(Craftsman)