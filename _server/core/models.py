from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class UserPost(models.Model):
    id = models.BigAutoField(primary_key=True)
    title = models.TextField()
    description = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    isPublic = models.BooleanField(default=False)
    