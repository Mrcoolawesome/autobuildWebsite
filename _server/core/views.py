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
@login_required
def index(req):
    context = {
        "asset_url": os.environ.get("ASSET_URL", ""),
        "debug": settings.DEBUG,
        "manifest": MANIFEST,
        "js_file": "" if settings.DEBUG else MANIFEST["src/main.ts"]["file"],
        "css_file": "" if settings.DEBUG else MANIFEST["src/main.ts"]["css"][0]
    }
    return render(req, "core/index.html", context)

@login_required
def currentUser(req):
    return JsonResponse({"user": model_to_dict(req.user)})

@login_required
def posts(req):
    if req.method == "POST":
        body = json.loads(req.body)
        post = UserPost(
            title=body["title"],
            description=body["description"],
            user=req.user
        )
        post.save() # save post to database
        return JsonResponse({"post": model_to_dict(post)}) # return the post with the header 'post'
    
    posts = [model_to_dict(post) for post in req.user.userpost_set.all()] # converting all posts into a json file (it's dumb ik)
    return JsonResponse({"posts": posts})