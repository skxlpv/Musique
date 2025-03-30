from django.contrib import admin

from api.v1.user_profile.models import (
    UserProfile, MusicianProfile, ArtistProfile,
    TheatreArtistProfile, WriterProfile, CraftsmanProfile
)

# Register your models here.
admin.site.register(UserProfile)
admin.site.register(MusicianProfile)
admin.site.register(ArtistProfile)
admin.site.register(TheatreArtistProfile)
admin.site.register(WriterProfile)
admin.site.register(CraftsmanProfile)