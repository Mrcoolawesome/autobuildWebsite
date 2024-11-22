from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static
from django.views.static import serve
from django.urls import re_path

urlpatterns = [
    path('', view=views.index, name="index"),
    path('user/', view=views.currentUser, name="current user"),
    path('posts/', view=views.posts, name="posts"),
    path('posts/<int:id>/', view=views.personalPosts, name="user posts"),
    path('posts/undefined/', view=views.personalPosts, name="dummy url"),
    path('post/<int:id>/', view=views.getPost, name="individual post"),
    # path('thumbnails/<path:path>/', serve, {'document_root': settings.MEDIA_ROOT}),
] #+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) # THIS DOESN'T WORK FOR PRODUCTION

if settings.DEBUG:
    urlpatterns += [
        re_path(
            r"^thumbnails/(?P<path>.*)$",
            serve,
            {
                "document_root": settings.MEDIA_ROOT,
            },
        ),
    ]