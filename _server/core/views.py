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

def index(req):
    context = {
        "asset_url": os.environ.get("ASSET_URL", ""),
        "debug": settings.DEBUG,
        "manifest": MANIFEST,
        "js_file": "" if settings.DEBUG else MANIFEST["src/main.ts"]["file"],
        "css_file": "" if settings.DEBUG else MANIFEST["src/main.ts"]["css"][0]
    }
    return render(req, "core/index.html", context)

# get the user, if they're not signed in, mark them as 'anonymous'
def currentUser(req):
    if req.user.is_authenticated:
        return JsonResponse({"user": model_to_dict(req.user)})
    else:
        return JsonResponse({"user": "anonymous"})

# saves new posts to the db or returns posts
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
            post_dict = model_to_dict(post)  
            post_dict['thumbnail'] = post.thumbnail.url 
            posts.append(post_dict)
        return JsonResponse({"posts": posts})

# gets the personal posts from the db
@login_required
def personalPosts(req, id):
    if req.method == "GET": # if we're reading from the db
        posts = [] 
        # converting all posts into a json file (it's dumb ik)
        for post in req.user.userpost_set.all():
            if post.user.id == id:
                post_dict = model_to_dict(post)
                post_dict['thumbnail'] = post.thumbnail.url 
                posts.append(post_dict)
                
        return JsonResponse({"posts": posts})

# gets a single posts' information
def getPost(req, id):
    if req.method == "GET": # if we're reading from the db
        post = UserPost.objects.get(id=id)
        # converting all posts into a json file (it's dumb ik)
        post_dict = model_to_dict(post)
        post_dict['thumbnail'] = post.thumbnail.url  
        return JsonResponse({"post": post_dict})

# for editing a post
@login_required    
def updatePost(req, id):
    if req.method == "POST":  # If we want to update the post
        post = UserPost.objects.get(id=id)
        # Update the post fields (you can add validation as needed)
        post.title = req.POST.get('title', post.title)
        post.description = req.POST.get('description', post.description)
        post.isPublic = req.POST.get("isPublic") == "true"
        post.user = req.user
        if req.FILES.get("thumbnail"): # make sure the user actually changed the thumbnail
            post.thumbnail = req.FILES.get("thumbnail")
        if req.POST.get("vehicle"): # make sure the user actually changed the vehicle
            post.vehicle = json.loads(req.POST.get("vehicle"))

        post.save()  # Save the updated post back to the database
        
        return JsonResponse({"message": "Post updated successfully"}, status=200)