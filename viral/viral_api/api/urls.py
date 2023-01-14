
from django.urls import path
from viral_api.api.views import VirusesAV,VirusHostAV,AnnouncementsAV,PPIPredicter,ViralInfectionPredicterOptions,ViralInfectionPredicter,MembersAV,PublicationsAV,ModelsAV,ContentAV


urlpatterns = [
    path('viruses/', VirusesAV.as_view()),
    path('announcements/',AnnouncementsAV.as_view()),
    path('viruses-hosts/', VirusHostAV.as_view()),
    path('ppi-predicter/', PPIPredicter.as_view()),
    path('viral-infection-predicter-options/', ViralInfectionPredicterOptions.as_view()),
    path('viral-infection-predicter/', ViralInfectionPredicter.as_view()),
    path('members/', MembersAV.as_view()),
    path('publications/', PublicationsAV.as_view()),
    path('models/', ModelsAV.as_view()),
    path("content/", ContentAV.as_view())

]
