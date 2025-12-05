// src/components/ElectionCard.jsx

 
import React, { useState,useEffect } from "react";  
import { useNavigate } from "react-router-dom";
import api from "../posts";



export default function ElectionCard({name,desc,start,end,region,id,dash,past,avail})
  {
  
    const navigate=useNavigate();
    const[msg,setmsg]=useState(false);

    if(avail===true)
    {

     const votedornot=async()=>{
    
          try{
            console.log(id);
               const res=await api.get("votedorno", { params: { id: id } ,withCredentials:true})


            setmsg(res.data.msg);
            console.log(res.data.msg);
          }

          

            catch (err) {
     
      
  if (err.response && err.response.data && err.response.data.msg) {
     setmsg(err.response.data.msg);
     
  } else {
    
    setmsg("Something went wrong");
  }
}

            
    
         }
    
    
         useEffect(()=>{
    
            votedornot();
    
         },[id]);

        }
    
    

       const handleclick=()=>{

        if(avail==true)
        {      console.log("id election")
              console.log(id)
         navigate("/votingPanel",{state:{"id":id}})
        }

        if(past==true)
        {
              console.log("true")
         navigate("/results",{state:{"id":id,"election":name}})
        }
     
    }
    


  return (
    <div className="bg-white border border-gray-300 rounded-lg p-4 max-w-md mx-auto my-4 shadow-md ">
      <h1 className="text-2xl mb-2 text-gray-800">
      
      </h1>

       <p className="text-lg font-bold text-gray-700 mb-4">
        Election name: <span className="text-gray-900">{name}</span>
      </p>

        <p className="text-lg font-bold text-gray-700 mb-4">
        Election description: <span className="text-gray-900">{desc}</span>
      </p>


     <p className="text-lg font-bold text-gray-700 mb-4">
        Election region: <span className="text-gray-900">{region}</span>
      </p>

      

      <p className="text-lg font-bold text-gray-700 mb-4">
        Voting start on: <span className="text-gray-900">{start}</span>
      </p>

      <p className="text-lg font-bold text-gray-700 mb-4">
        Voting ends on: <span className="text-gray-900">{end}</span>
      </p>

        
     {past  && 
     
<button className="px-5 py-2 text-lg text-white bg-gray-600 rounded hover:bg-[#17252A]" type="button" onClick={handleclick} >
          
          Check Results
        </button>
     }


      
     {!dash && msg=="true" && 
     
<button className="px-5 py-2 text-lg text-white bg-gray-600  rounded hover:bg-[#17252A]" type="button" onClick={handleclick} >
          
          Vote Now
        </button>
     }

      {!dash && msg=="false" && 
     
<h1 className="px-5 py-2 text-lg text-white  rounded bg-red-500"  >
          
          Already voted
        </h1>
     }

     

     
        
      
    </div>
  );
}

