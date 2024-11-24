from django.forms import model_to_dict
from django.http import JsonResponse
from django.shortcuts import render
from django.conf  import settings
import json, os
from django.contrib.auth.decorators import login_required
from .models import UserPost

# Load manifest when server launches
MANIFEST = {}
if not settings.DEBUG:
    f = open(f"{settings.BASE_DIR}/core/static/manifest.json")
    MANIFEST = json.load(f)

# Create your views here.
def index(req):
    context = {
        "asset_url": os.environ.get("ASSET_URL", ""),
        "debug": settings.DEBUG,
        "manifest": MANIFEST,
        "js_file": "" if settings.DEBUG else MANIFEST["src/main.ts"]["file"],
        "css_file": "" if settings.DEBUG else MANIFEST["src/main.ts"]["css"][0]
    }
    return render(req, "core/index.html", context)

def currentUser(req):
    if req.user.is_authenticated:
        return JsonResponse({"user": model_to_dict(req.user)})
    else:
        return JsonResponse({"user": "anonymous"})

def posts(req):
    if req.method == "POST": # if we're writing to the db
        post = UserPost(
            title=req.POST.get('title'),
            description=req.POST.get("description"),
            isPublic=req.POST.get("isPublic") == "true",
            user=req.user,
            thumbnail=req.FILES.get("thumbnail"),
            vehicle=json.loads(req.POST.get("vehicle")),
        )
        post.save() # save post to database
        post_dict = model_to_dict(post)
        post_dict['thumbnail'] = post.thumbnail.url  # Get the URL for the thumbnail image

        return JsonResponse({"post": post_dict})  # return the post with the thumbnail URL
        
    if req.method == "GET": # if we're reading from the db
        posts = [] 
        # converting all posts into a json file (it's dumb ik)
        for post in UserPost.objects.filter(isPublic=True):
            post_dict = model_to_dict(post)  # Convert the post to a dictionary
            post_dict['thumbnail'] = post.thumbnail.url  # Get the URL of the thumbnail
            posts.append(post_dict)
        return JsonResponse({"posts": posts})

@login_required
def personalPosts(req, id):
    if req.method == "GET": # if we're reading from the db
        posts = [] 
        # converting all posts into a json file (it's dumb ik)
        for post in req.user.userpost_set.all():
            if post.user.id == id:
                post_dict = model_to_dict(post)  # Convert the post to a dictionary
                post_dict['thumbnail'] = post.thumbnail.url  # Get the URL of the thumbnail
                posts.append(post_dict)
                
        return JsonResponse({"posts": posts})
    
def getPost(req, id):
    if req.method == "GET": # if we're reading from the db
        # converting all posts into a json file (it's dumb ik)
        post = UserPost.objects.get(id=id)
        post_dict = model_to_dict(post)
        post_dict['thumbnail'] = post.thumbnail.url  # Get the URL of the thumbnail
        return JsonResponse({"post": post_dict})