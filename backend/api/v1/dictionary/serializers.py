from __future__ import annotations

from api.v1.dictionary.models import ChordA
from api.v1.dictionary.models import ChordB
from api.v1.dictionary.models import ChordC
from api.v1.dictionary.models import ChordD
from api.v1.dictionary.models import ChordE
from api.v1.dictionary.models import ChordF
from api.v1.dictionary.models import ChordG
from rest_framework import serializers

CHORD_MODELS = {
    'A': ChordA,
    'A#': ChordA,
    'B': ChordB,
    'C': ChordC,
    'C#': ChordC,
    'D': ChordD,
    'D#': ChordD,
    'E': ChordE,
    'E#': ChordE,
    'F': ChordF,
    'F#': ChordF,
    'G': ChordG,
    'G#': ChordG,
}


class ChordSerializer(serializers.ModelSerializer):
    class Meta:
        fields = [
            'root',
            'type',
            'name',
            'code',
            'alternative',
            'subset',
            'group',
        ]

    @classmethod
    def get_model(cls, root_note):
        try:
            return CHORD_MODELS[root_note.upper()]
        except KeyError:
            return None

    @classmethod
    def get_serializer(cls, root_note):
        model = cls.get_model(root_note)
        if model is None:
            return None
        elif model:
            return type(
                f'{model.__name__}Serializer',
                (cls,),
                {
                    'Meta': type(
                        'Meta',
                        (),
                        {'model': model, 'fields': cls.Meta.fields},
                    ),
                },
            )
        else:
            raise ValueError(f'No model found for root note {root_note}')
