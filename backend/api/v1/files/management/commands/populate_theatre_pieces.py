import django
import os

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

import random
from django.core.management.base import BaseCommand
from django.core.files import File
from faker import Faker
from api.v1.users.models import CustomUser
from api.v1.files.models import TheatreModel
from io import BytesIO
from PIL import Image, ImageDraw
from datetime import datetime, timedelta


class Command(BaseCommand):
    help = 'Populates database with sample theatre pieces with cover arts'

    def handle(self, *args, **options):
        User = CustomUser

        # Create a test user if none exists
        user, created = User.objects.get_or_create(
            username='testplaywright',
            defaults={
                'email': 'playwright@example.com',
                'password': 'testpass123'
            }
        )

        # Sample theatre files directory
        theatre_dir = "api/v1/files/management/commands/sample_theatre_pieces"
        if not os.path.exists(theatre_dir):
            os.makedirs(theatre_dir)
            self.stdout.write(self.style.WARNING(
                f"Created {theatre_dir} directory. Add some test theatre files (PDFs, scripts, etc.) and run again."
            ))
            return

        theatre_files = [f for f in os.listdir(theatre_dir)
                         if f.lower().endswith(('.pdf', '.doc', '.docx', '.txt'))]

        if not theatre_files:
            self.stdout.write(self.style.ERROR(
                f"No theatre files found in {theatre_dir}. Add some script files first."
            ))
            return

        # Data for generating records
        genres = ['Drama', 'Comedy', 'Tragedy', 'Musical', 'Absurdist', 'Historical', 'Political', 'Romantic']
        playwrights = ['William Shakespeare', 'Anton Chekhov', 'Henrik Ibsen', 'Arthur Miller',
                       'Tennessee Williams', 'Lorraine Hansberry', 'August Wilson', 'Caryl Churchill']
        periods = ['Ancient', 'Medieval', 'Renaissance', '18th Century', '19th Century', 'Modern', 'Contemporary',
                   'Futuristic']
        themes = ['Love', 'Betrayal', 'Power', 'Justice', 'Family', 'War', 'Identity', 'Freedom']

        for i, file_name in enumerate(theatre_files[:50]):
            file_path = os.path.join(theatre_dir, file_name)
            piece_title = file_name.split('.')[0].replace('_', ' ').title()

            with open(file_path, 'rb') as theatre_file:
                theatre = TheatreModel(
                    title=f"{piece_title}",
                    description=f"A {random.choice(themes).lower()} {random.choice(genres).lower()} piece " +
                                f"set in the {random.choice(periods).lower()} period.",
                    author=user,
                    playwright=random.choice(playwrights),
                    genre=random.choice(genres),
                    duration_minutes=random.randint(30, 180),  # 30 min to 3 hours
                    cast_size=random.randint(1, 20),
                    performance_date=datetime.now() - timedelta(days=random.randint(1, 365 * 10)),
                    category='theatre',
                    file_type='document',
                    is_downloadable=random.choice([True, False]),
                )

                theatre.file.save(file_name, File(theatre_file))

            self.stdout.write(self.style.SUCCESS(
                f"Created theatre piece: {theatre.title} by {theatre.playwright}"
            ))

        self.stdout.write(self.style.SUCCESS(
            f"Successfully created {min(len(theatre_files), 20)} theatre records with cover arts!"
        ))


if __name__ == '__main__':
    Command().handle()