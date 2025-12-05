import pandas as pd
import os
import sys
import django

sys.path.append("D:/voting/VotingApp-IP/backend")

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")  # Replace with your project name
django.setup()
from api.models import Statescode 

df=pd.read_csv('pincode-dataset.csv')



for index,row in df.iterrows():
   
       Statescode.objects.create(Pincode=row['Pincode'],District=row['District'],StateName=row['StateName'])

print("successfull")

