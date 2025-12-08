from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
   
)


urlpatterns = [
   path("superadminlogin",views.superadminlogin.as_view(),name="superadminlogin.as_view()"),
  
   path("adminlogin",views.Adminlogin.as_view(),name="Adminlogin.as_view()"),
    path("addadmins",views.addadmins.as_view(),name="addadmins.as_view()"),
   path("electionsadded",views.electionsadded.as_view(),name="electionsadded.as_view()"),
   path("candidatesadded",views.candidatesadded.as_view(),name="candidatesadded.as_view()"),
   path('api/token', TokenObtainPairView.as_view(), name='token_obtain_pair'),
   path("register",views.Registeruser.as_view(),name="Registeruser.as_view()"),
   path("loginvoter",views.VoterLogin.as_view(),name="VoterLogin.as_view()"),
   path("profile",views.Profile.as_view(),name="Profile.as_view()"),
   path("results",views.Result.as_view(),name="Result.as_view()"),
   path("voteadded",views.Votescount.as_view(),name="Votescount.as_view()"),
   path("votedorno",views.Votedornotyet.as_view(),name="Votedornotyet.as_view()"),
   path("logout",views.Logout.as_view(),name="Logout.as_view()"),
   path("update",views.Update.as_view(),name="Update.as_view()"),

    
]
