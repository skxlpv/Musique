from django.contrib import admin

from api.v1.user_profile.models import (
    UserProfile, MusicianProfile, ArtistProfile,
    TheatreArtistProfile, WriterProfile, CraftsmanProfile
)
from api.v1.user_profile.submodels.artist import Style, Medium, Exhibition
from api.v1.user_profile.submodels.craftsman import Material, Workshop
from api.v1.user_profile.submodels.musician import Instrument, Genre, Band
from api.v1.user_profile.submodels.theatre_artist import TheatreRole, TheatreCompany, TheatrePieceGenre, TheatreProject
from api.v1.user_profile.submodels.writer import WriterGenre

class HiddenModelAdmin(admin.ModelAdmin):
    """Admin class for models that should exist but not be visible in the admin list."""
    def get_model_perms(self, request):
        return {}  # Returns empty permissions dict to hide the model


# Profiles Models
admin.site.register(UserProfile)
admin.site.register(MusicianProfile)
admin.site.register(ArtistProfile)
admin.site.register(TheatreArtistProfile)
admin.site.register(WriterProfile)
admin.site.register(CraftsmanProfile)

# Musician Specific Models
admin.site.register(Instrument, HiddenModelAdmin)
admin.site.register(Band, HiddenModelAdmin)
admin.site.register(Genre, HiddenModelAdmin)

# Artist Specific Models
admin.site.register(Style, HiddenModelAdmin)
admin.site.register(Medium, HiddenModelAdmin)
admin.site.register(Exhibition, HiddenModelAdmin)

# Craftsman Specific Models
admin.site.register(Material, HiddenModelAdmin)
admin.site.register(Workshop, HiddenModelAdmin)

# Theatre Artist Specific Models
admin.site.register(TheatreRole, HiddenModelAdmin)
admin.site.register(TheatreCompany, HiddenModelAdmin)
admin.site.register(TheatrePieceGenre, HiddenModelAdmin)
admin.site.register(TheatreProject, HiddenModelAdmin)

# Writer Specific Models
admin.site.register(WriterGenre, HiddenModelAdmin)