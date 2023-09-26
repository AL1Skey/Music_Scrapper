from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
from bs4 import BeautifulSoup
import requests
from django.views.decorators.csrf import csrf_exempt
import json
from urllib.parse import unquote

def index(request):
    return HttpResponse("<h1> Success Deployed</h1>")

# Create your views here.
@csrf_exempt
def results(request):
    if request.method == 'POST':
        results = ''# Create results
        try:
            results = json.loads(request.body) #Get request that being sended to backend
            results = requests.get(results['link'])#Get link from that results
        except Exception as e:
            return JsonResponse({"error":e})#retrn error if there Exception
        
        # Scrap linked content
        soup = BeautifulSoup(results.content,'html.parser')
        # Get all audio tag
        main_course = soup.find_all('audio')
        count = 1 #set counter for key on nextjs
        if main_course:
            serve = []# Set empty array
            sounds = ["ogg","mpeg","mp3","opus"]#set audio format
            for course in main_course:
                source = course.get('src')#Get src attributes value
                filename = ''#set the filename
                for i in sounds:#Loop through audio format
                    if i in source:#if audio format match
                        #filter source from unnecessary endpoint
                        source = source[ : (source.index(i)+len(i)) ]
                        #Split source then get filename from source
                        #And translate encrypted symbol
                        filename = unquote((source.split("/")[::-1])[0])
                        break
                #Append value to serve
                serve.append({'id':count,"src":source,"filename":filename,
                              "href":course.find("a").get('href') if course.find("a").get('href') else "Empty","style":course.get('style')})
                count+=1#Add count
                
            return JsonResponse(serve,safe=False)#Return JSON files to frontend
        else:
            return JsonResponse({"error":"EMPTY"})#Print empty if main course is empty
    return JsonResponse({"error":"Forbidden Access"})#Print if its not POST
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
        