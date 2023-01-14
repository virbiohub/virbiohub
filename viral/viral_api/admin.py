from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from viral_api.models import Viruses,Announcement,ViralPredictions,Publication,Member,Model,Content
# Register your models here.
from django.utils.html import format_html
from django.forms import Textarea
from django.db import models
class AdminFiles(admin.ModelAdmin):
    list_display = ['name']

class MemberFiles(admin.ModelAdmin):
    list_display = ['name',"surname"]
    search_fields = ("name", )

admin.site.register(Viruses,AdminFiles)
admin.site.register(ViralPredictions,AdminFiles)
admin.site.register(Member,MemberFiles)
admin.site.register(Publication)
admin.site.register(Model)



@admin.register(Content)
class ContentAdmin(admin.ModelAdmin):
    list_display = ('title', 'content', 'image')

@admin.register(Announcement)
class Announcement(admin.ModelAdmin):
    list_display=("title","content")
    
