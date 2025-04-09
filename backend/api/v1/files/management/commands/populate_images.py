import django
import os

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')  # Replace with your actual settings path
django.setup()

import random
from django.core.management.base import BaseCommand
from django.core.files import File
from django.contrib.auth import get_user_model
from faker import Faker
from api.v1.users.models import CustomUser


from api.v1.files.models import VisualArtModel


class Command(BaseCommand):
    help = 'Populates database with sample image uploads'

    def handle(self, *args, **options):
        fake = Faker()
        User = CustomUser

        # Create a test user if none exists
        User, created = User.objects.get_or_create(
            username='testartist',
            defaults={
                'email': 'artist@example.com',
                'password': 'testpass123'
            }
        )

        # Sample image directory (create this folder and add some test images)
        image_dir = "api/v1/files/management/commands/sample_images"
        if not os.path.exists(image_dir):
            os.makedirs(image_dir)
            self.stdout.write(self.style.WARNING(
                f"Created {image_dir} directory. Please add some test images there and run again."
            ))
            return

        image_files = [f for f in os.listdir(image_dir) if f.lower().endswith(('.png', '.jpg', '.jpeg', '.gif'))]

        if not image_files:
            self.stdout.write(self.style.ERROR(
                f"No images found in {image_dir}. Please add some images and try again."
            ))
            return

        styles = ['abstract', 'realism', 'impressionism', 'cubism', 'surrealism']
        mediums = ['oil', 'watercolor', 'digital', 'acrylic', 'pencil']

        for i, img_name in enumerate(image_files[:20]):  # Limit to 20 images
            img_path = os.path.join(image_dir, img_name)

            with open(img_path, 'rb') as img_file:
                art = VisualArtModel(
                    title=fake.sentence(nb_words=3),
                    description=fake.paragraph(nb_sentences=3),
                    author=User,
                    style=random.choice(styles),
                    medium=random.choice(mediums),
                    width_px=random.randint(500, 4000),
                    height_px=random.randint(500, 4000),
                    category='visual_art',
                )

                # Save the image file
                art.file.save(img_name, File(img_file))
                art.save()

            self.stdout.write(self.style.SUCCESS(
                f"Created artwork: {art.title} (ID: {art.id})"
            ))

        self.stdout.write(self.style.SUCCESS(
            f"Successfully created {len(image_files)} image records!"
        ))

Command().handle()