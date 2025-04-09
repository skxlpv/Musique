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
                f"Created {music_dir} directory. Add some test audio files and run again."
            ))
            return

        audio_files = [f for f in os.listdir(music_dir)
                       if f.lower().endswith(('.mp3', '.wav', '.ogg', '.flac'))]

        if not audio_files:
            self.stdout.write(self.style.ERROR(
                f"No audio files found in {music_dir}. Add some music files first."
            ))
            return

        # Data for generating records
        genres = ['Rock', 'Jazz', 'Electronic', 'Classical', 'Hip-Hop', 'Blues', 'Pop', 'Metal']
        instruments = ['Guitar', 'Piano', 'Drums', 'Bass', 'Violin', 'Synthesizer', 'Trumpet', 'Saxophone']
        moods = ['Happy', 'Sad', 'Energetic', 'Calm', 'Romantic', 'Aggressive']
        colors = ['#FF5733', '#33FF57', '#3357FF', '#F033FF', '#FF33F0', '#33FFF0']
        composers = ['John Smith', 'Emma Johnson', 'Michael Williams', 'Sarah Brown',
                     'David Jones', 'Lisa Garcia', 'Robert Miller', 'Jennifer Davis']

        for i, audio_name in enumerate(audio_files[:20]):  # Limit to 20 files
            audio_path = os.path.join(music_dir, audio_name)
            song_title = audio_name.split('.')[0].replace('_', ' ').title()

            # Generate a simple cover art image
            cover_image = self.generate_cover_art(
                title=song_title,
                color=random.choice(colors))

            with open(audio_path, 'rb') as audio_file:
                music = MusicModel(
                    title=f"{song_title}",
                    description=f"A {random.choice(moods).lower()} {random.choice(genres).lower()} composition " +
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
                    is_featured=(i < 3)  # First 3 songs are featured
                )

                # Save the audio file
                music.file.save(audio_name, File(audio_file))

                # Save the cover art
                cover_name = f"{song_title.replace(' ', '_')}_cover.jpg"
                music.cover_art.save(cover_name, File(cover_image))
                music.save()

            self.stdout.write(self.style.SUCCESS(
                f"Created music entry: {music.title} by {music.composer}"
            ))

        self.stdout.write(self.style.SUCCESS(
            f"Successfully created {min(len(audio_files), 20)} music records with cover arts!"
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