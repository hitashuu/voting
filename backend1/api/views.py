from unicodedata import name
from urllib import request

from rest_framework.response import Response

from rest_framework.views import APIView
from django.contrib.auth.models import User

from rest_framework import status
from django.contrib.auth import authenticate, login as auth_login  
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from .Serializers import stateadminserial,electionserial,candidateserial,voterserial
from django.contrib.auth.hashers import make_password
from .models import Stateadmin,voter,elections,Candidates,Statescode,HasVoted
from django.contrib.auth.hashers import check_password
from rest_framework.permissions import IsAdminUser
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from .authentication import CookieJWTAuthentication
from datetime import date
from django.db.models import Q
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework_simplejwt.tokens import RefreshToken
from api.permissions import Admincheck


# //from .serializers import UploadedImageSerializer

# class UploadedImageView(APIView):
#     parser_classes = [  # important for file uploads
#         'rest_framework.parsers.MultiPartParser',
#         'rest_framework.parsers.FormParser'
#     ]

def get_admin_token(admin):
    refresh = RefreshToken()
    refresh["admin_id"] = admin.id
    return str(refresh.access_token)

class Logout(APIView):
     def get(self,request):
          
          response=Response({"msg":"You have been logout ,login again"},status=status.HTTP_200_OK)
          response.delete_cookie('user')
          response.delete_cookie('super')
          response.delete_cookie('admin')
          return response
          







class superadminlogin(APIView):
       
      def post(self,request):
           
            
            username=request.data['username']
            password=request.data['password']

            user=authenticate(username=username,password=password)
            if user is not None:
                  token=AccessToken.for_user(user)

                  response = Response({"msg": "Superadmin login successful","role":"superadmin"}, status=status.HTTP_200_OK)
                  response .set_cookie(
                        key='super',
                        value=str(token),
                        httponly=True,
                        secure=False,
                        samesite='Lax',
                        max_age=24*60*60,
                       

                  )

                  response.delete_cookie('user')
                  return response
            return Response({"msg": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)


class Update(APIView):
      permission_classes = [IsAuthenticated]
      authentication_classes = [CookieJWTAuthentication] 

      def post(self,request):

           username=request.data['username']
           password=request.data['password']
           
           id=request.user.id
           try:
                user=voter.objects.get(id=id)
                

                check=authenticate(username=username,password=password)
                if check is not None:
                     serial=voterserial(user,data=request.data,partial=True)

                     if serial.is_valid():
                          serial.save()

                          user.set_password(request.data['password'])
                          user.save()
                          return Response({"msg":"Update successful"},status=status.HTTP_200_OK)
                     else:
                           return Response({"msg":serial.errors},status=status.HTTP_400_BAD_REQUEST)

                else:
                     return Response({"msg":"Invalid details,you cant update voter id"},status=status.HTTP_400_BAD_REQUEST)


           except voter.DoesNotExist:
                return Response({"msg":"user doesnot exist"},status=status.HTTP_404_NOT_FOUND)

class addadmins(APIView):

      permission_classes = [IsAdminUser]
      authentication_classes = [CookieJWTAuthentication] 



     

      def post(self,request):
           data=request.data
          
           

           state= stateadminserial(data=data)
           if state.is_valid():
                 
                 state.save()
               

                 return Response({"msg":"Admin added successfully",}, status=status.HTTP_200_OK)
           
           return Response({"result":state.errors},status=status.HTTP_409_CONFLICT)
      
      
class Adminlogin(APIView):
      def post(self,request):
           
          data = request.data
          region = data['region']
          plain_password = data['password']  

          
          


          
           
          
          try:
                user=Stateadmin.objects.get(region=region)
                password=user.password
                

                

           
                

                
                if check_password(plain_password,password):
                        

                        refresh = RefreshToken()
                        refresh["admin_id"] = user.id   # custom claim
                        access_token = str(refresh.access_token)

                        response = Response(
                              {"msg": "Admin login successful", "region": region},
                                status=status.HTTP_200_OK
                           )

                 
                        
                       
                     
   
                        response=Response({"msg":"Admin login successful","region":request.data['region']},status=status.HTTP_200_OK)
                        response .set_cookie(
                        key='admin',
                        value=access_token,
                        httponly=True,
                        secure=False,
                        samesite='Lax',
                        max_age=24*60*60,)
                        return response
                       

                  
                
                  
                else:
                     
                   return Response({"msg":"Wrong Password"},status=status. HTTP_400_BAD_REQUEST)

          except Stateadmin.DoesNotExist:
                 return Response({"msg":"Admin doesnot exist"},status=status.HTTP_404_NOT_FOUND)
          

class electionsadded(APIView):
      
      authentication_classes = [CookieJWTAuthentication] 

      def get_permissions(self):
        if self.request.method == "POST":
            return [Admincheck()]   
        else:
            return [IsAuthenticated()]


      def post(self,request):

            result=electionserial(data=request.data)
            if result.is_valid():
                  result.save()
                  return Response({"result":result.data,"msg": "Election added successfully",},status=status.HTTP_200_OK)

            return Response({"result": result.errors},status=status.HTTP_400_BAD_REQUEST)
      
      def get(self,request):
            ans=0

            



            if request.user.username=='super' :
                
                result_obj=elections.objects.all()


            
                 
                 
           
            elif request.user.is_active==True:
                
                pincode=request.user.pincode
                print("pincode:")
                print(pincode)
                try:
                     state=Statescode.objects.get(Pincode=pincode)
                     district=state.District
                     state_name=state.StateName
                     print(district)
                     print(state_name)

                except:
                      ans=1

                if ans==1:
                     
                      first=Q(region__icontains=request.user.region)
                      result_obj=elections.objects.filter(first)

                else:
                      first=Q(region__icontains=request.user.region)
                      sec=Q(region__icontains=district)
                      third=Q(region__icontains=state_name)
                      result_obj=elections.objects.filter(first|sec|third)
                

                
               
                
            
            
            
            result=electionserial(result_obj,many=True)
            if result is not None:
                 
              before=[]
              after=[]
                 

              for item in result.data:
                  if item['election_end_date']<str(date.today()):
                          
                       
                    before.append(item)
                       
                  elif item['election_end_date']>=str(date.today()):
                          after.append(item)
                        
                             

                   
                       
              return Response({"before":before,"after":after})
            
            else:
                 return Response({"msg":"no elections for now"},status=status.HTTP_400_BAD_REQUEST)

                 
      

           # else:
#     # for admin users
            # data = elections.objects.filter(region=request.user.region)
            # result=electionserial(data,many=True)
            # if result is not None:

            #     before=[]
            #     after=[]

            #     for item in result.data:
            #            if item['election_end_date']<str(date.today()):
                          
                       
            #               before.append(item)
                       
            #            elif item['election_end_date']>=str(date.today()):
            #               after.append(item)
                        
                             

                   
                       
            #     return Response({"before":before,"after":after})

            # else:
            #     return Response({"msg":"No elections currently"})


      
      
            

      


class candidatesadded(APIView):
      
      authentication_classes = [CookieJWTAuthentication] 


      def get_permissions(self):
        if self.request.method == "POST":
            return [Admincheck()]   
        elif self.request.method == "GET":
            return [IsAuthenticated()]
        


      parser_classes = [MultiPartParser, FormParser]

      
      def post(self,request):
            
             print(request.data)
             
             user_obj=candidateserial(data=request.data)

             if user_obj.is_valid():
                   user_obj.save()
                  
                   return Response({"msg":"Candidate added successfully,now you can add another candidate"},status=status.HTTP_200_OK)
             
             return Response({"result": user_obj.errors},status=status.HTTP_400_BAD_REQUEST)
      
      def get(self,request):
            id=request.GET.get("id")
            # region=id.region
            obj=Candidates.objects.filter(user_id=id)
            print(obj)
            election_name = obj.first().user.election_name 
            election_desc=obj.first().user.election_desc

            print(election_name)
            print(election_desc)
            if not obj.exists:
                  return Response({"result":"no candidates for now"},status=status.HTTP_400_BAD_REQUEST)
            result=candidateserial(obj,many=True)
            return Response({"result":result.data,"election_name":election_name,"election_desc":election_desc},status=status.HTTP_200_OK)
           
            
            
      
class Registeruser(APIView):

       parser_classes = [MultiPartParser, FormParser]
       def post(self,request):
            # print(request.data['image'])
            print("here")
            print(request.FILES)  
            print(request.FILES.get("image"))
            
            result=voterserial(data=request.data)
            if result.is_valid():
                  
                  
                  result.save()
                  return Response({"msg": "Registration successfull"},status=status.HTTP_200_OK)
            
           
            return Response({"result": result.errors,},status=status.HTTP_400_BAD_REQUEST)
      

class VoterLogin(APIView):
      
      def post(self,request):
            username=request.data['username']
            
            password=request.data['password']
            print(password)

            user=authenticate(username=username,password=password)
            
            if user is not None:
                  

                  token=AccessToken.for_user(user)
                  response=Response({"msg": "Login successfull","role":"user"},status=status.HTTP_200_OK)
                  response.set_cookie(

                      
                        key='user',
                        value=str(token),
                         httponly=True,
                         secure=False,
                        samesite='Lax',
                        max_age=86400,
                        
                      )
                  response.delete_cookie('access')

                  return response 
            else:
               return Response({"msg": "wrong credentails or user does not exist",},status=status.HTTP_400_BAD_REQUEST)
            
class Profile(APIView):
      permission_classes = [IsAuthenticated]
      authentication_classes = [CookieJWTAuthentication] 
      def get(self,request):


            id=request.user.id
            print(id)
            try:
            
      
                 obj=voter.objects.get(id=id)
            
                 result=voterserial(obj,many=False)
                 return Response({"result":result.data},status=status.HTTP_200_OK)
      
            except:
               return Response({"msg":"User doesnot exist"},status=status.HTTP_400_BAD_REQUEST)
            
class Result(APIView):

      permission_classes = [IsAuthenticated]
      authentication_classes = [CookieJWTAuthentication] 
      
      def get(self,request):
           id=request.GET.get('id')
           obj=Candidates.objects.filter(user_id=id).order_by('-votes')

           total_votes=0
           for item in obj:
                 total_votes=total_votes+item.votes

           serial=candidateserial(obj,many=True)

          

           

           return Response({"result":serial.data,"total":total_votes})
      
class Votescount(APIView):

      permission_classes = [IsAuthenticated]
      authentication_classes = [CookieJWTAuthentication] 
      def get(self,request):
         id=request.GET.get("id")
         elec=request.GET.get("election_id")
         voters_id=request.user.id
         print(voters_id)

         print(id)


         try:
            obj= Candidates.objects.get(id=id)
            obj.votes=obj.votes+1
            obj.save()

            HasVoted.objects.create(voter_id=voters_id,elec_id=elec)






            
            
            return Response({"msg":"Successfully voted"},status=status.HTTP_200_OK)
         except Candidates.DoesNotExist:
              return Response({"msg":"candidate doesnt exist"},status=status.HTTP_400_BAD_REQUEST) 


class Votedornotyet(APIView):
     def get(self,request):
          
          voter=request.user.id
          election_id=request.GET.get("id")
          print(voter)
          print(election_id)

          
          
          obj=HasVoted.objects.filter(elec_id=election_id)

          if not obj.exists():
                print("yes")

                return Response({"msg":"true"},status=status.HTTP_200_OK)
                
              

          for item in obj:
                   if item.voter_id==voter:
                        return Response({"msg":"false"},status=status.HTTP_400_BAD_REQUEST,)
                   
          return Response({"msg":"true"},status=status.HTTP_200_OK)
          


          
          

      



            

            
