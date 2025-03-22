from __future__ import annotations

from django.db import models


class ChordType(models.Model):
    name = models.TextField(blank=True, null=True)
    code = models.TextField(blank=True, null=True)
    group = models.TextField(blank=True, null=True)

    class Meta:
        db_table = 'chord_type'


class ChordA(models.Model):
    root = models.TextField(blank=True, null=True)
    type = models.TextField(blank=True, null=True)
    name = models.TextField(blank=True, null=True)
    code = models.TextField(blank=True, null=True)
    alternative = models.IntegerField(blank=True, null=True)
    subset = models.IntegerField(blank=True, null=True)
    group = models.IntegerField(blank=True, null=True)

    class Meta:
        db_table = 'chords_a'


class ChordB(models.Model):
    root = models.TextField(blank=True, null=True)
    type = models.TextField(blank=True, null=True)
    name = models.TextField(blank=True, null=True)
    code = models.TextField(blank=True, null=True)
    alternative = models.IntegerField(blank=True, null=True)
    subset = models.IntegerField(blank=True, null=True)
    group = models.IntegerField(blank=True, null=True)

    class Meta:
        db_table = 'chords_b'


class ChordC(models.Model):
    root = models.TextField(blank=True, null=True)
    type = models.TextField(blank=True, null=True)
    name = models.TextField(blank=True, null=True)
    code = models.TextField(blank=True, null=True)
    alternative = models.IntegerField(blank=True, null=True)
    subset = models.IntegerField(blank=True, null=True)
    group = models.IntegerField(blank=True, null=True)

    class Meta:
        db_table = 'chords_c'


class ChordD(models.Model):
    root = models.TextField(blank=True, null=True)
    type = models.TextField(blank=True, null=True)
    name = models.TextField(blank=True, null=True)
    code = models.TextField(blank=True, null=True)
    alternative = models.IntegerField(blank=True, null=True)
    subset = models.IntegerField(blank=True, null=True)
    group = models.IntegerField(blank=True, null=True)

    class Meta:
        db_table = 'chords_d'


class ChordE(models.Model):
    root = models.TextField(blank=True, null=True)
    type = models.TextField(blank=True, null=True)
    name = models.TextField(blank=True, null=True)
    code = models.TextField(blank=True, null=True)
    alternative = models.IntegerField(blank=True, null=True)
    subset = models.IntegerField(blank=True, null=True)
    group = models.IntegerField(blank=True, null=True)

    class Meta:
        db_table = 'chords_e'


class ChordF(models.Model):
    root = models.TextField(blank=True, null=True)
    type = models.TextField(blank=True, null=True)
    name = models.TextField(blank=True, null=True)
    code = models.TextField(blank=True, null=True)
    alternative = models.IntegerField(blank=True, null=True)
    subset = models.IntegerField(blank=True, null=True)
    group = models.IntegerField(blank=True, null=True)

    class Meta:
        db_table = 'chords_f'


class ChordG(models.Model):
    root = models.TextField(blank=True, null=True)
    type = models.TextField(blank=True, null=True)
    name = models.TextField(blank=True, null=True)
    code = models.TextField(blank=True, null=True)
    alternative = models.IntegerField(blank=True, null=True)
    subset = models.IntegerField(blank=True, null=True)
    group = models.IntegerField(blank=True, null=True)

    class Meta:
        db_table = 'chords_g'
