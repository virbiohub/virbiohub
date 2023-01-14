from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from viral_api.models import Viruses, Announcement, ViralPredictions, Member, Publication,Model,Content
from viral_api.api.serializers import AnnouncementSerializer, DataSerializer, MemberSerializer, PublicationSerializer,ModelSerializer,ContentSerializer
import os
from pandas import read_excel
from rest_framework.parsers import MultiPartParser
from django.core.files.storage import FileSystemStorage
import json
from rest_framework import status
import subprocess
import ast
import numpy as np
curr_dir = os.path.dirname(os.path.abspath(__file__))

FILE_PATH = "/home/website/main/viral"
TEMP_DIR = "/home/website/main/viral/files/temp/"
def get_results(tool,value):
    try:
        result = {}
        keys_value = list(value)
        host = keys_value[0].split(",")[0]
        virus = keys_value[0].split(",")[1]
        result["host"] = host
        result["virus"] = virus
        tool_result = f"result_{tool}"
        tool_probability = f"accuracy_{tool}"
        result[tool_result] = value[keys_value[0]][1]
        if (value[keys_value[0]][0]):
            result[tool_probability]  = value[keys_value[0]][0]
        return result
    except Exception as e:
        return {}

def writeToFile(uuid, filename, content):
    dir_path = (f"/home/website/main/viral/files/temp/{str(uuid)}_{filename}")
    f = open(os.path.normpath(dir_path), "w")
    f.write(content)
    f.close()

def deleteFile(uuid):
    """ This function deletes files in the files/temp directory based on the uuid."""
    for file in os.listdir(TEMP_DIR):
        if file.startswith(uuid):
            os.remove(os.path.join(TEMP_DIR, file))
def storeFile(file, uuid,fileType):
    """ This function is used to store a file in a temporary directory."""
    dir_path = (f"{curr_dir}/../../files/temp/{str(uuid)}_{fileType}")
    try:
        with open(os.path.normpath(dir_path), "wb+") as temp_dir:
            for chunk in file.chunks():
                temp_dir.write(chunk)
        return "OK"
    except BaseException as err:
        return err


def getHeaders(row):
    """ This function returns the headers for a given table row. """

    headers = {'virus': [], 'host': [],
               'viral_proteins': [], 'host_reseptor_proteins': []}
    for item in row:
        if (item.startswith("virus")):
            headers["virus"].append(item)
        elif (item.startswith("hostReceptor")):
            headers["host_reseptor_proteins"].append(item)
        elif (item.startswith("host")):
            headers['host'].append(item)
        elif (item.startswith("viralProteins")):
            headers['viral_proteins'].append(item)
    return headers


class VirusesAV(APIView):
    def get(self, request):
        """ This function returns a list of available viruse tables. """
        tables = Viruses.objects.all()
        virusFamily = [repr(table)for table in tables]
        data = {"virusFamilies": sorted(virusFamily)}
        return Response(data)
class AnnouncementsAV(APIView):
    def get(self, request):
        """ This function returns a list of announcements."""
        data = Announcement.objects.all().order_by("date").reverse()
        serializer = AnnouncementSerializer(data, many=True)
        if(serializer.is_valid):
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)


class VirusHostAV(APIView):
    def get(self, request):
        """ This function returns data of virus-host table for a given family in the request. """
        tables = Viruses.objects.all()
        params = request.query_params
        query = params["virusFamily"]
        data = {}
        for i in tables:
            table_name = repr(i)
            if query in table_name:
                url = f"{curr_dir}/../../files/{str(i.data)}"

                records = read_excel(url)
                data = records.to_dict("records")
                headers = getHeaders(data[0])
                data = {"headers": headers, "data": data}
        return Response(data)

class PPIPredicter(APIView):
    parser_classes = (MultiPartParser,)

    def post(self, request, format=None):
        HOSTFILE = "host.fasta"
        VIRUSFILE = "virus.fasta"
        isVirusSequenceDataFile = request.FILES.__contains__("virusSequenceFile")
        isHostSequenceFile = request.FILES.__contains__("hostSequenceFile")
        tools = request.POST["tools"]
        uuid = request.POST["uuid"]
        if(not isVirusSequenceDataFile):
            virusData = request.POST["virusSequenceFile"]
            writeToFile(uuid,VIRUSFILE,virusData)
        else:
            virusData = request.FILES["virusSequenceFile"]
            storeFile(virusData, uuid,VIRUSFILE)
        if(not isHostSequenceFile):
            hostSequence = request.data.get("hostSequenceFile")
            writeToFile(uuid,HOSTFILE,hostSequence)
        else:
            hostSequence = request.FILES["hostSequenceFile"]
            storeFile(hostSequence, uuid,HOSTFILE)
        '''
        m1=Denovo                                                                      ppi.py
        m2 = Hopitor
        m3 = Hvppi
        m4 = HVI
        '''
        try:
            # os.system('python scripname ',arg1,arg2...) call the scripts with args
            hostFilePath = f"/home/website/main/viral/files/temp/{str(uuid)}_{HOSTFILE}"
            virusFilePath = f"/home/website/main/viral/files/temp/{str(uuid)}_{VIRUSFILE}"
            resultFilePath =f"/home/website/main/viral/files/temp/{str(uuid)}_results.json"
            modelPath = f"/home/website/ppi/ppi.py"
            envPath = f"/home/website/Environments/ppi-project/bin/python"
           # y  = os.popen(envPath + " " + modelPath + " f4 m2,m3 " + resultFilePath + " " + hostFilePath + " " + virusFilePath).read()
            selected_tools = ""
            for tool in tools:
                selected_tools+=tool
            cmd_args = f" f4 {selected_tools} "
            y  = os.popen(envPath + " " + modelPath + cmd_args + resultFilePath + " " + hostFilePath + " " + virusFilePath).read()
           # result = os.popen(envPath + " " + modelPath + " f4 "+ selected_tools+
            # resultFilePath + " " + hostFilePath + " " + virusFilePath)
        except Exception as e:
            print("exception",e)
            return Response({"Status": "failed", "error": str(e)})

            # READ PPI PREDICTION RESULTS
        try:
            results = []
            f = open(resultFilePath)
            data = json.loads(f.read())
            deleteFile(uuid)
            for key,value in data.items():
                if key=='hvi' or  key=="denovo":
                    continue
                res = ast.literal_eval(str(data[key]))
                for __,v in res.items():
                    if( __ == "hvi" or __ == "denovo"):
                        continue
                    for i,k in  v.items():
                        if  any(d['key'] == i for d in results):
                            for dict_obj in results:
                                if (dict_obj["key"]== i):
                                    accuracy = __ + "_accuracy"
                                    pred = __+ "_pred"
                                    if type(k)== tuple:
                                        dict_obj[accuracy]=k[0]
                                        dict_obj[pred] = k[1]
                                    else:
                                        dict_obj[accuracy]=k.split(",")[0]
                                        dict_obj[pred] = k.split(",")[1]
                        else:
                            item = dict()
                            item["key"] = i
                            item["host"] =i.split(",")[0]
                            item["virus"] = i.split(",")[1]
                            accuracy = __ + "_accuracy"
                            pred = __ + "_pred"
                            if type(k)== tuple:
                                item[accuracy]=k[0]
                                item[pred] = k[1]
                            else:
                                item[accuracy]=k.split(",")[0]
                                item[pred] = k.split(",")[1]
                            results.append(item)

            f.close()

        except Exception as e:
            print(e)

            return Response(status=status.HTTP_400_BAD_REQUEST)

        return Response({ "data":results,"status":status.HTTP_200_OK})


class ViralInfectionPredicterOptions(APIView):
    """ This function returns list of available virus-host names based on the virus-viral family."""
    def get(self, request, format=None):
        params = request.query_params
        tables = ViralPredictions.objects.all()
        params = request.query_params
        family = params["virusfamily"]
        selectedFamily = ViralPredictions.objects.get(name=family)
        records = read_excel(os.path.join(FILE_PATH,"files", str(selectedFamily.data)))
        records_dict = records.to_dict("records")
        viruses = []
        hosts =[]
        for item in np.array(records_dict):
            if item["host_Scientific_Name"] not in hosts:
                hosts.append(item["host_Scientific_Name"])
            if item["virus_Scientific_Name"] not in viruses:
                viruses.append(item["virus_Scientific_Name"])

        return Response({"hosts": hosts, "viruses": viruses, "status": status.HTTP_200_OK})

       # return Response({"error": "No Options found", "status": status.HTTP_404_NOT_FOUND})

class ViralInfectionPredicter(APIView):
    def get(self, request, format=None):
        params = request.query_params
        tables = ViralPredictions.objects.all()
        params = request.query_params
        family = params["virusfamily"]
        hosts = json.loads(request.GET["hosts"])
        viruses = json.loads(request.GET["viruses"])
        data = {}
        for table in tables:
            table_name = repr(table)
            if family in table_name:
                url =  os.path.join(FILE_PATH,"files", str(table.data))
                records = read_excel(url)
                data = records.to_dict("records")
                host_virus_pairs = [{"virus": virus, "host": host}
                                    for virus in viruses for host in hosts]
                result = []
                for dataitem in data:
                    for res in host_virus_pairs:
                        if(res["virus"] == dataitem['virus_Scientific_Name'] and res["host"] == dataitem['host_Scientific_Name']):
                            result.append(dataitem)
        headers = getHeaders(result[0])
        headers['result'] = []
        headers['result'].append("prediction")

        return Response({"data": result, "headers": headers, "status": status.HTTP_200_OK})


class MembersAV(APIView):
    def get(self, request):
        members = Member.objects.all()
        member_serializer = MemberSerializer(
            members, many=True, context={"request": request})
        if(member_serializer.is_valid):
            response = {"data": member_serializer.data,
                        "status": status.HTTP_200_OK}
            return Response(response)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

class PublicationsAV(APIView):
    def get(self, request):
        publications = Publication.objects.all()
        publication_serializer = PublicationSerializer(publications, many=True)
        if(publication_serializer.is_valid):
            return Response({"data": publication_serializer.data, "status": status.HTTP_200_OK})
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

class ModelsAV(APIView):
    def get(self,request):
        models = Model.objects.all()
        model_serializer = ModelSerializer(models, many=True)
        if(model_serializer.is_valid):
            return Response({"data": model_serializer.data, "status": status.HTTP_200_OK})
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)


class ContentAV(APIView):
    def get(self, request):
        params = request.query_params
        parametre = params["param"]
        content = Content.objects.filter(title=parametre)
        content_serializer = ContentSerializer(content, many=True, context={"request": request})
        if(content_serializer.is_valid):
            return Response({"data": content_serializer.data, "status": status.HTTP_200_OK})
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)