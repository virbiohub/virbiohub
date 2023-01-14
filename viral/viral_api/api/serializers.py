from rest_framework import serializers
from viral_api.models import Member,Content



class AnnouncementSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=600)
    content= serializers.CharField(max_length=1200)
    date=serializers.DateField()


class CoronavirusSerializer(serializers.Serializer):
    virus_taxid = serializers.CharField(max_length=100)
    virus_ScientificName_CommonName = serializers.CharField(max_length=100)
    virus_LineageInfo = serializers.CharField(max_length=200)
    host_taxid = serializers.CharField(max_length=100)
    host_ScientificName_CommonName = serializers.CharField(max_length=100)
    host_LineageInfo = serializers.CharField(max_length=200)
    viralProteins_ViralProtein1_Accession_GeneName_ProteinName = serializers.CharField(
        max_length=100)
    hostReceptorProteins_Receptor1_Accession_GeneName_ProteinName = serializers.CharField(
        max_length=100)
    hostReceptorProteins_Receptor2_Accession_GeneName_ProteinName = serializers.CharField(
        max_length=100)


class virusNameSerializer(serializers.Serializer):
    virus_ScientificName_CommonName = serializers.StringRelatedField(many=True)

class hostNameSerializer(serializers.Serializer):
    host_ScientificName_CommonName = serializers.StringRelatedField(many=True)


class MemberSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=100)
    surname=serializers.CharField(max_length=40)
    email=serializers.CharField(max_length=50)
    phone=serializers.CharField(max_length=40)
    researchgate_address=serializers.CharField(max_length=100)
    linkedin_address=serializers.CharField(max_length=100)
    googlescholar_address=serializers.CharField(max_length=100)
    title = serializers.CharField(max_length=20)
    role= serializers.CharField(max_length=100)
    photo = serializers.SerializerMethodField()
    class Meta:
        model= Member

    def get_photo(self,member):
        request = self.context.get('request')
        photo = member.photo.url
        return request.build_absolute_uri(photo)




class DataSerializer(serializers.Serializer):
     data = serializers.ListField(child=serializers.StringRelatedField())

class PublicationSerializer(serializers.Serializer):
     title = serializers.CharField(max_length=600)
     authors = serializers.CharField(max_length=1500)
     url = serializers.CharField(max_length=600)
     journal = serializers.CharField(max_length=600)
     date = serializers.DateField()


class ModelSerializer(serializers.Serializer):
    id = serializers.PrimaryKeyRelatedField(read_only=True)
    name = serializers.CharField(max_length=100)
    articleAddress = serializers.CharField(max_length=100)
    title = serializers.CharField(max_length=100)
    authors= serializers.CharField(max_length=100)
    journal = serializers.CharField(max_length=100)
    cmd_arg = serializers.CharField(max_length=100)


class ContentSerializer(serializers.Serializer):
    id = serializers.PrimaryKeyRelatedField(read_only=True)
    content = serializers.CharField(max_length=2000)
    title = serializers.CharField(max_length=100)
    photo = serializers.SerializerMethodField()
    class Meta:
        model= Content
    def get_photo(self,content):
        request = self.context.get('request')
        print("requestt",request)
        print("contenttt",content)
        photo = content.image.url
        return request.build_absolute_uri(photo)