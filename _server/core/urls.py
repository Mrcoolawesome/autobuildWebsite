from django.urls import path
from . import views

urlpatterns = [
    path('', view=views.index, name="index"),
    path('user/', view=views.currentUser, name="current user"),
    path('posts/', view=views.posts, name="posts"),
    path('posts/<int:id>/', view=views.personalPosts, name="user posts"),
    path('posts/undefined/', view=views.personalPosts, name="dummy url"),
]