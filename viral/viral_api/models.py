from os import name
from django.db import models
from django.core.files.storage import FileSystemStorage
from django.test import tag


# Create your models here.

# announcements model, influenza model


class Announcement(models.Model):
    title = models.CharField(max_length=600)
    content= models.TextField(null=True)
    date=models.DateField()
    def __str__(self):
        return self.title



class Adenovirus(models.Model):
    virus_taxid = models.CharField(max_length=100)
    virus_ScientificName_CommonName = models.CharField(max_length=100)
    virus_LineageInfo = models.CharField(max_length=200)
    host_taxid = models.CharField(max_length=100)
    host_Scientific_CommonName = models.CharField(max_length=100)
    host_LineageInfo = models.CharField(max_length=200)
    viralProteins_ViralProtein1_Accession_GeneName_ProteinName = models.CharField(
        max_length=100)
    hostReceptorProteins_Receptor1_Accession_GeneName_ProteinName = models.CharField(
        max_length=100)
    hostReceptorProteins_Receptor2_Accession_GeneName_ProteinName = models.CharField(
        max_length=100)
    hostReceptorProteins_Receptor3_Accession_GeneName_ProteinName = models.CharField(
        max_length=100)
    hostReceptorProteins_Receptor4_Accession_GeneName_ProteinName = models.CharField(
        max_length=100)
    hostReceptorProteins_Receptor5_Accession_GeneName_ProteinName = models.CharField(
        max_length=100)
    hostReceptorProteins_Receptor6_Accession_GeneName_ProteinName = models.CharField(
        max_length=100)
    hostReceptorProteins_Receptor7_Accession_GeneName_ProteinName = models.CharField(
        max_length=100)
    hostReceptorProteins_Receptor8_Accession_GeneName_ProteinName = models.CharField(
        max_length=100)

    def __str__(self):
        return f"{self.id}, {self.virus_ScientificName_CommonName}"

    class Meta:
        pass


class Coronavirus(models.Model):
    virus_taxid = models.CharField(max_length=100)
    virus_ScientificName_CommonName = models.CharField(max_length=100)
    virus_LineageInfo = models.CharField(max_length=200)
    host_taxid = models.CharField(max_length=100)
    host_ScientificName_CommonName = models.CharField(max_length=100)
    host_LineageInfo = models.CharField(max_length=200)
    viralProteins_ViralProtein1_Accession_GeneName_ProteinName = models.CharField(
        max_length=100)
    hostReceptorProteins_Receptor1_Accession_GeneName_ProteinName = models.CharField(
        max_length=100)
    hostReceptorProteins_Receptor2_Accession_GeneName_ProteinName = models.CharField(
        max_length=100)


class Viruses(models.Model):
    name = models.CharField(max_length=300)
    data=models.FileField(upload_to='viruses')
    def __str__(self):
        return self.name

    def __repr__(self):
        return self.name


class ViralPredictions(models.Model):
    name = models.CharField(max_length=300)
    data=models.FileField(upload_to='viral_predictions')
    def __str__(self):
        return self.name

    def __repr__(self):
        return self.name


class Member(models.Model):
    name = models.CharField(max_length=100)
    surname=models.CharField(max_length=40)
    email=models.CharField(max_length=50)
    phone=models.CharField(max_length=40)
    researchgate_address=models.CharField(max_length=100)
    linkedin_address=models.CharField(max_length=100)
    googlescholar_address=models.CharField(max_length=100)
    title = models.CharField(max_length=20)
    role= models.CharField(max_length=100)
    photo = models.FileField(upload_to="members/")
    def __str__(self):
        return self.name + "  "+ self.surname



class Publication(models.Model):
     title = models.TextField(max_length=600)
     authors =  models.TextField(max_length=1500)
     url = models.CharField(max_length=600)
     journal = models.CharField(max_length=600)
     date = models.DateField(default="01/01/1970")

     def __str__(self):
        return self.name




class Model(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    articleAddress = models.CharField(max_length=100)
    title = models.CharField(max_length=100)
    authors= models.CharField(max_length=100)
    journal = models.CharField(max_length=100)
    cmd_arg = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Content(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100)
    content = models.TextField(max_length=2000)
    image = models.FileField(upload_to="content/")
    def __str__(self):
        return self.title
