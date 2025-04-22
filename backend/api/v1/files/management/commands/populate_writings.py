import django
import os

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

import random
from django.core.management.base import BaseCommand
from django.core.files import File
from faker import Faker
from api.v1.users.models import CustomUser
from api.v1.files.models import WritingModel
from datetime import datetime, timedelta


class Command(BaseCommand):
    help = 'Populates database with sample writing pieces'

    def handle(self, *args, **options):
        User = CustomUser
        fake = Faker()

        # Create a test user if none exists
        user, created = User.objects.get_or_create(
            username='testwriter',
            defaults={
                'email': 'writer@example.com',
                'password': 'testpass123'
            }
        )

        # Sample writings files directory
        writings_dir = "api/v1/files/management/commands/sample_writings"
        if not os.path.exists(writings_dir):
            os.makedirs(writings_dir)
            self.stdout.write(self.style.WARNING(
                f"Created {writings_dir} directory. Add some test writing files (DOC, DOCX, TXT, etc.) and run again."
            ))
            return

        writing_files = [f for f in os.listdir(writings_dir)
                         if f.lower().endswith(('.doc', '.docx', '.txt', '.rtf', '.pdf'))]

        if not writing_files:
            self.stdout.write(self.style.ERROR(
                f"No writing files found in {writings_dir}. Add some writing files first."
            ))
            return

        # Data for generating records
        genres = ['Fiction', 'Non-fiction', 'Poetry', 'Short Story', 'Novel', 'Essay', 'Memoir', 'Biography']
        languages = ['English', 'Spanish', 'French', 'German', 'Russian', 'Chinese', 'Japanese', 'Arabic']
        publishers = ['Penguin Random House', 'HarperCollins', 'Simon & Schuster', 'Hachette Book Group',
                      'Macmillan Publishers', 'Self-published', 'University Press', 'Independent Press']

        for i, file_name in enumerate(writing_files[:50]):
            file_path = os.path.join(writings_dir, file_name)
            piece_title = file_name.split('.')[0].replace('_', ' ').title()

            with open(file_path, 'rb') as writing_file:
                word_count = random.randint(1000, 100000)  # Random word count between 1,000 and 100,000

                writing = WritingModel(
                    title=piece_title,
                    description=fake.paragraph(nb_sentences=3),
                    author=user,
                    word_count=word_count,
                    language=random.choice(languages),
                    genre=random.choice(genres),
                    publication_date=datetime.now() - timedelta(days=random.randint(1, 365 * 5)),
                    publisher=random.choice(publishers),
                    category='writing',
                    file_type='document',
                    is_downloadable=random.choice([True, False]),
                    tags=', '.join(fake.words(nb=random.randint(3, 6)))
                )

                writing.file.save(file_name, File(writing_file))

            self.stdout.write(self.style.SUCCESS(
                f"Created writing piece: {writing.title} ({writing.genre}, {writing.word_count} words)"
            ))

        self.stdout.write(self.style.SUCCESS(
            f"Successfully created {min(len(writing_files), 50)} writing records!"
        ))


if __name__ == '__main__':
    Command().handle()