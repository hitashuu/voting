import React from 'react'
import { useState,useRef } from 'react';
import api from '../posts';
import { useLocation } from "react-router-dom";
import { Link } from 'react-router-dom';



export default function AddCandidates() {

  

  const[msg,setmessage]=useState("");
   const location = useLocation();
   

const ans = location.state || {};
   

   const id=ans.id;

  
  
  
  
   const candidate_name_ref=useRef();
   const candidate_party_ref=useRef();
   const image_ref=useRef();

   const handlesubmit=async(e)=>{
    e.preventDefault();
    

  //   const candidates={
     
  //     candidate_name:candidate_name_ref.current.value,
  //     candidate_party:candidate_party_ref.current.value,
  //     user:id
  // }


  const form=new FormData();
  form.append('candidate_name',candidate_name_ref.current.value);
  console.log(candidate_name_ref.current.value);
  form.append('candidate_party',candidate_party_ref.current.value);
  form.append('user',id);
  console.log(image_ref.current.files[0]);
  form.append('image',image_ref.current.files[0]);

  try{
    
    const res=await api.post("candidatesadded",form,{withCredentials:true}
     
      
    );
    
    setmessage(res.data.msg);


  }

  

     catch (err) {
       
      
  if (err.response && err.response.data && err.response.data.result) {
     setmessage(JSON.stringify(err.response.data.result));
     
  } else {
    
    setmessage("Something went wrong");
  }

  }
   };
   
   
  return (

    
       
    
    <div className="w-11/12 max-w-6xl mx-auto p-2 font-sans">
      <h1 className="text-3xl font-semibold text-center mb-5 text-[#17252A]">
        Add Candidates for Election: <span className="text-[#3AAFA9]">{ans.name}</span> and Region:<span className="text-[#3AAFA9]"> {ans.region}</span>
        {msg && <p className="text-green-500">{msg}</p>}

      </h1>

      <form onSubmit={handlesubmit}>
      <section className=" p-4 mb-8">
        <h2 className="text-xl font-semibold mb-4">Candidate Details</h2>

       
       

       
        
      
        

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Name of Candidate</label>
          <input
            ref={candidate_name_ref}
            type="text"
            
            className="w-full border rounded-md px-3 py-2"
          />
        </div>

         <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Candidate party name</label>
          <input
            ref={candidate_party_ref}
            type="text"
           
            className="w-full border rounded-md px-3 py-2"
          />
        </div>
      </section>

       <div class="mb-4">
      <label for="password" class="block text-gray-700 font-medium mb-2">Password</label>
      <input
        type="file"
        id="image"
        name="image"
        ref={image_ref}
        placeholder="Upload image"
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        //onChange={(e) => setForm({ ...form, image: e.target.files[0] })}

       
      />
    </div>

       


    
      <div className="text-center">
        <button className="bg-[#3AAFA9] hover:bg-[#17252A] text-white px-6 py-2 rounded mr-4">
          Save Candidate
        </button>
        
      </div>

      

      <br></br>

      <div className="text-center">
        <Link to='/adminpanel' className="bg-[#3AAFA9] hover:bg-[#17252A] text-white px-6 py-2 rounded mr-4">
          Add Elections
        </Link>
        
      </div>

       </form>
     
    </div>
    
  );
}
