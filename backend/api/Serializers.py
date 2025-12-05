from rest_framework import serializers
from .models import Stateadmin,elections,Candidates,voter
from django.contrib.auth.hashers import make_password
# from .models import UploadedImage


class stateadminserial(serializers.ModelSerializer):
    class Meta:
        model=Stateadmin
        fields=['password','region']


    def create(self, validated_data):
        password = validated_data.pop('password')
        user = Stateadmin(**validated_data)
        user.password=make_password(password)  
        user.save()
        return user

    

class electionserial(serializers.ModelSerializer):
    class Meta:
        model=elections
        fields='__all__'

    def validate(self,data):
        elect=elections.objects.filter(election_name=data['election_name'])
        

        for item in elect:
            if data['region']==item.region and data['election_start_date']<item.election_end_date:
                raise serializers.ValidationError(f"Elections for {data['election_name']} already exists in {data['region']}")
            
        return data
    





class candidateserial(serializers.ModelSerializer):
    class Meta:
        model=Candidates
        fields='__all__'
    
    

class voterserial(serializers.ModelSerializer):

    # image = Base64ImageField(
    #     max_length=None, use_url=True,
    # )
    class Meta:
        model=voter
        fields=['username','email','region','address','phoneno','password','pincode','name','image']

      

    # def validate_username(self,value):
    #     if len(value['username'])>10:
    #         raise serializers.ValidationError("Voter id must be of 10 digits/characters ")
    #     return value
    
    # def validate_pincode(self,value):
    #     if(len(value['pincode'])>6):
    #         raise serializers.ValidationError("Pin code must be of 6 digits")
    #     return value
    
    # def validate_phoneno(self,value):
    #      if(len(value['phoneno'])>10):
    #         raise serializers.ValidationError("Phone no must be 10 digits long")
    #      return value
    
    def create(self, validated_data):
        password = validated_data.pop('password')
        user = voter(**validated_data)
        user.set_password(password)  
        user.save()
        return user