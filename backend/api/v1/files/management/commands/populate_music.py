import django
import os

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')  # Replace with your actual settings path
django.setup()

import random
from django.core.management.base import BaseCommand
from django.core.files import File
from faker import Faker
from api.v1.users.models import CustomUser
from api.v1.files.models import MusicModel
from io import BytesIO
from PIL import Image, ImageDraw
from datetime import datetime, timedelta


class Command(BaseCommand):
    help = 'Populates database with sample music uploads with cover arts'

    def handle(self, *args, **options):
        User = CustomUser

        # Create a test user if none exists
        user, created = User.objects.get_or_create(
            username='testmusician',
            defaults={
                'email': 'musician@example.com',
                'password': 'testpass123'
            }
        )

        # Sample music directory
        music_dir = "api/v1/files/management/commands/sample_music"

        if not os.path.exists(music_dir):
            os.makedirs(music_dir)
            self.stdout.write(self.style.WARNING(
                f"Created {music_dir} directory. Add some album folders with music files and run again."
            ))
            return

        # Data for generating records
        genres = ['Rock', 'Jazz', 'Electronic', 'Classical', 'Hip-Hop', 'Blues', 'Pop', 'Metal']
        instruments = ['Guitar', 'Piano', 'Drums', 'Bass', 'Violin', 'Synthesizer', 'Trumpet', 'Saxophone']
        moods = ['Happy', 'Sad', 'Energetic', 'Calm', 'Romantic', 'Aggressive']
        colors = ['#FF5733', '#33FF57', '#3357FF', '#F033FF', '#FF33F0', '#33FFF0']
        composers = ['John Smith', 'Emma Johnson', 'Michael Williams', 'Sarah Brown',
                     'David Jones', 'Lisa Garcia', 'Robert Miller', 'Jennifer Davis']

        album_folders = [f for f in os.listdir(music_dir)
                         if os.path.isdir(os.path.join(music_dir, f))]

        if not album_folders:
            self.stdout.write(self.style.ERROR(
                f"No album folders found in {music_dir}. Create folders with music files first."
            ))
            return

        total_tracks_created = 0

        for album_folder in album_folders:  # Limit to 10 albums
            album_path = os.path.join(music_dir, album_folder)

            # Find cover art in the album folder
            cover_image = None
            cover_path = None
            for ext in ['.jpg', '.jpeg', '.png', '.gif']:
                for f in os.listdir(album_path):
                    if f.lower().endswith(ext) and 'cover' in f.lower():
                        cover_path = os.path.join(album_path, f)
                        break
                if cover_path:
                    break

            if cover_path:
                try:
                    with open(cover_path, 'rb') as f:
                        cover_image = BytesIO(f.read())
                    self.stdout.write(self.style.SUCCESS(
                        f"Found cover art for album {album_folder}: {cover_path}"
                    ))
                except Exception as e:
                    self.stdout.write(self.style.WARNING(
                        f"Could not read cover art {cover_path}: {str(e)}"
                    ))
            else:
                self.stdout.write(self.style.WARNING(
                    f"No cover art found in {album_folder}, will generate one"
                ))
                cover_image = self.generate_cover_art(
                    title=album_folder.replace('_', ' ').title(),
                    color=random.choice(colors))

            # Find audio files in the album folder
            audio_files = [f for f in os.listdir(album_path)
                           if f.lower().endswith(('.mp3', '.wav', '.ogg', '.flac'))]

            if not audio_files:
                self.stdout.write(self.style.WARNING(
                    f"No audio files found in album {album_folder}"
                ))
                continue

            # Create records for each track in the album
            for i, audio_name in enumerate(audio_files):
                audio_path = os.path.join(album_path, audio_name)
                track_title = audio_name.split('.')[0].replace('_', ' ').title()
                album_title = album_folder.replace('_', ' ').title()

                with open(audio_path, 'rb') as audio_file:
                    music = MusicModel(
                        title=f"{track_title}",
                        description=f"Track {i + 1} from the album '{album_title}'. " +
                                    f"A {random.choice(moods).lower()} {random.choice(genres).lower()} composition " +
                                    f"featuring {random.choice(instruments).lower()}.",
                        author=user,
                        genre=random.choice(genres),
                        bpm=random.randint(60, 200),
                        duration_seconds=random.randint(120, 600),  # 2-10 minutes
                        instruments=', '.join(random.sample(instruments, k=random.randint(1, 3))),
                        composer=random.choice(composers),
                        recording_date=datetime.now() - timedelta(days=random.randint(1, 365 * 5)),
                        category='music',
                        file_type='audio',
                        is_downloadable=random.choice([True, False]),
                        is_featured=(i < 1)  # First track in each album is featured
                    )

                    # Save the audio file
                    music.file.save(audio_name, File(audio_file))

                    # Save the cover art (same for all tracks in album)
                    cover_name = f"{album_folder}_cover.jpg"
                    if isinstance(cover_image, BytesIO):
                        music.cover_art.save(cover_name, File(cover_image))
                    else:
                        music.cover_art.save(cover_name, cover_image)
                    music.save()

                    total_tracks_created += 1
                    self.stdout.write(self.style.SUCCESS(
                        f"Created track: {music.title} from album '{album_title}'"
                    ))

        self.stdout.write(self.style.SUCCESS(
            f"Successfully created {total_tracks_created} tracks from {len(album_folders)} albums!"
        ))

    def generate_cover_art(self, title, color='#3357FF', size=(500, 500)):
        """Generate a simple cover art image with the given title"""
        # Create a blank image
        img = Image.new('RGB', size, color)
        draw = ImageDraw.Draw(img)

        # Add some simple text
        draw.text((50, size[1] // 2), title, fill='white', font_size=24)

        # Add some random elements to make it look like album art
        for _ in range(5):
            x = random.randint(0, size[0])
            y = random.randint(0, size[1])
            radius = random.randint(5, 50)
            draw.ellipse([x, y, x + radius, y + radius], fill='white', outline='black')

        # Save to a BytesIO object
        img_io = BytesIO()
        img.save(img_io, format='JPEG', quality=85)
        img_io.seek(0)

        return img_io


if __name__ == '__main__':
    Command().handle()