from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class UserPost(models.Model):
    id = models.BigAutoField(primary_key=True)
    title = models.TextField()
    description = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    isPublic = models.BooleanField(default=False)
    # null=True: Allows the field to store NULL in the database for posts without images so that the db won't error
    thumbnail = models.ImageField(null=True, blank=True) # will automatically store in the thumbnails folder. 
    vehicle = models.JSONField(null=True, blank=True)
    