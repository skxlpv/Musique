from rest_framework import serializers

from api.v1.dictionary.models import ChordA, ChordB, ChordC, ChordD, ChordE, ChordF, ChordG

CHORD_MODELS = {
    'A': ChordA,
    'B': ChordB,
    'C': ChordC,
    'D': ChordD,
    'E': ChordE,
    'F': ChordF,
    'G': ChordG,
}


class ChordSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ['root', 'type', 'name', 'code', 'alternative', 'subset', 'group']

    @classmethod
    def get_model(cls, root_note):
        return CHORD_MODELS.get(root_note.upper())

    @classmethod
    def get_serializer(cls, root_note):
        model = cls.get_model(root_note)
        if model:
            return type(f'{model.__name__}Serializer', (cls,), {'Meta': type('Meta', (), {'model': model, 'fields': cls.Meta.fields})})
        else:
            raise ValueError(f"No model found for root note {root_note}")