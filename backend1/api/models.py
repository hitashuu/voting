from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser,AbstractBaseUser
# from .models import UploadedImage


class Stateadmin(models.Model):
    region = models.CharField(max_length=500, unique=True)
    password=models.CharField(max_length=500)
    name=models.CharField(default='admin')


    


class elections(models.Model):
    election_name=models.CharField(max_length=500)
    election_desc=models.CharField(max_length=500)
    election_start_date=models.DateField()
    election_end_date=models.DateField()
    region=models.CharField(max_length=500)
    

    


class Candidates(models.Model):
    user=models.ForeignKey(elections,on_delete=models.CASCADE)
    candidate_name=models.CharField(max_length=500)
    candidate_party=models.CharField(max_length=500)
    votes=models.BigIntegerField(default=0)
    image=models.ImageField(upload_to='candidate_images/',null=True,blank=True)
    

class voter(AbstractUser):
    name=models.CharField(max_length=400)
    email=models.EmailField(max_length=500)
   
    region=models.CharField(max_length=500)
    address=models.CharField(max_length=600)
    phoneno=models.BigIntegerField(null=True,blank=True)
    pincode=models.BigIntegerField(null=True,blank=True)
    image=models.ImageField(upload_to='images/',null=True,blank=True)


    


class Statescode(models.Model):
    Pincode=models.CharField()
    District=models.CharField()
    StateName=models.CharField()

class HasVoted(models.Model):
    voter_id=models.BigIntegerField()
    elec_id=models.BigIntegerField()

    

   



  




    