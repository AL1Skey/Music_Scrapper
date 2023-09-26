from .views import *
from django.urls import path, include

urlpatterns = [
    path('',index),
    path('results', results,name="results"),
    path('download', download,name="download")
]
