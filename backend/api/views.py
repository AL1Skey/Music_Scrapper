from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
from bs4 import BeautifulSoup
import requests
from django.views.decorators.csrf import csrf_exempt
import json

# Create your views here.
@csrf_exempt
def results(request):
    if request.method == 'POST':
        results = ''
        try:
            results = json.loads(request.body) 
            results = requests.get(results['link'])
        except Exception as e:
            return JsonResponse({"error":e})
        
        soup = BeautifulSoup(results.content,'html.parser')
        main_course = soup.find_all('audio')
        count = 1
        if main_course:
            serve = []
            for course in main_course:
                serve.append({'id':count,"src":course.get('src'),
                              "href":course.find("a").get('href') if course.find("a").get('href') else "Empty","style":course.get('style')})
                count+=1
                
            return JsonResponse(serve,safe=False)
        else:
            return JsonResponse({"error":"EMPTY"})
    return JsonResponse({"error":"Forbidden Access"})
@csrf_exempt
def download(request):
    if request.method == "POST":
        response = ''
        try:
            response = json.loads(request.body)
        except Exception as e:
            raise Exception(e)
        response = HttpResponse(response["link"],content_type="application/force-download")
        response["Content-Disposition"]=";attachment"
        
        return response
    
    else:
        return HttpResponse("ERRORRRR")
        