import django
import os

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

import random
from django.core.management.base import BaseCommand
from django.core.files import File
from faker import Faker
from api.v1.users.models import CustomUser
from api.v1.files.models import CraftsModel
from datetime import datetime, timedelta


class Command(BaseCommand):
    help = 'Populates database with sample crafts instructions (PDF only)'

    def handle(self, *args, **options):
        User = CustomUser
        fake = Faker()

        # Create a test user if none exists
        user, created = User.objects.get_or_create(
            username='testcrafter',
            defaults={
                'email': 'crafter@example.com',
                'password': 'testpass123'
            }
        )

        # Sample crafts files directory
        crafts_dir = "api/v1/files/management/commands/sample_crafts"
        if not os.path.exists(crafts_dir):
            os.makedirs(crafts_dir)
            self.stdout.write(self.style.WARNING(
                f"Created {crafts_dir} directory. Add some test craft instruction PDFs and run again."
            ))
            return

        craft_files = [f for f in os.listdir(crafts_dir) if f.lower().endswith('.pdf')]

        if not craft_files:
            self.stdout.write(self.style.ERROR(
                f"No PDF files found in {crafts_dir}. Add some craft instruction PDFs first."
            ))
            return

        # Data for generating records
        difficulty_levels = ['Beginner', 'Easy', 'Intermediate', 'Advanced', 'Expert']
        time_required_options = ['Under 1 hour', '1-2 hours', '2-4 hours', 'Half day', 'Full day', 'Weekend project', 'Multi-day project']
        materials_list = [
            'Yarn, Knitting needles, Scissors',
            'Fabric, Thread, Sewing machine, Pins',
            'Wood, Nails, Hammer, Saw, Sandpaper',
            'Paper, Glue, Scissors, Markers',
            'Clay, Sculpting tools, Kiln access',
            'Beads, Wire, Pliers, Clasps',
            'Leather, Punch, Rivets, Waxed thread',
            'Glass, Soldering iron, Flux, Lead came'
        ]
        tools_list = [
            'Scissors, Ruler, Pencil',
            'Hammer, Screwdriver, Pliers',
            'Sewing machine, Needles, Pins',
            'Paintbrushes, Palette, Water jar',
            'Kiln, Potter\'s wheel, Clay tools',
            'Drill, Saw, Sandpaper, Clamps',
            'Crochet hooks, Stitch markers, Tape measure',
            'Wire cutters, Round-nose pliers, Crimping tool'
        ]

        for i, file_name in enumerate(craft_files[:50]):
            file_path = os.path.join(crafts_dir, file_name)
            craft_title = file_name.split('.')[0].replace('_', ' ').title()

            with open(file_path, 'rb') as craft_file:
                craft = CraftsModel(
                    title=craft_title,
                    description=fake.paragraph(nb_sentences=3),
                    author=user,
                    materials=random.choice(materials_list),
                    difficulty_level=random.choice(difficulty_levels),
                    time_required=random.choice(time_required_options),
                    tools_required=random.choice(tools_list),
                    instructions=fake.paragraphs(nb=3),
                    category='crafts',
                    file_type='pdf',
                    is_downloadable=random.choice([True, False]),
                    tags=', '.join(fake.words(nb=random.randint(3, 6)))
                )

                craft.file.save(file_name, File(craft_file))

            self.stdout.write(self.style.SUCCESS(
                f"Created craft instructions: {craft.title} ({craft.difficulty_level} difficulty)"
            ))

        self.stdout.write(self.style.SUCCESS(
            f"Successfully created {min(len(craft_files), 50)} craft instruction records!"
        ))


if __name__ == '__main__':
    Command().handle()