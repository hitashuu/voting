import React from 'react'
import { useRef,useState,useEffect} from 'react'
import api from "../posts"; 
//import AddCandidates from './AddCandidates';
import {Link,useNavigate,} from "react-router-dom";





export default function AdminPanel() {


   

   //const navigate=useNavigate();
  //  const location=useLocation();

  //  const ans=location.state.region;

  

   const election_name_ref=useRef();
   const election_desc_ref=useRef();
   const election_start_date_ref=useRef();
   const election_end_date_ref=useRef();
  const region_ref=useRef();


   
   
   const[msg,setmsg]=useState(null);
  

  
  const  submithandle= async (e)=>{
    e.preventDefault();

    const elections={
      election_name:election_name_ref.current.value,
      election_desc:election_desc_ref.current.value,
      election_start_date:election_start_date_ref.current.value,
      election_end_date:election_end_date_ref.current.value,
      region:region_ref.current.value



    }

      try{
        const res=await api.post("electionsadded",elections,{withCredentials: true });
       
        const done=res.data.result;

         console.log(done);
         setmsg(res.data);

        
    const result1 = {
    name: done.election_name,
    desc: done.election_desc,
    region: done.region,
    id:done.id

        }
       
       
      
 navigate("/addcandidates",{state:result1});


       
       
        
      }

     

          catch (err) {
     
      
  if (err.response && err.response.data && err.response.data.result) {
     setmsg(JSON.stringify(err.response.data.result))
     
  } else {
    
    setmsg("Something went wrong");
  }
        
      
        
      }

   
}


  


    
return (

  <>
  

  <div className="w-11/12 max-w-6xl mx-auto p-2 font-sans">
    <h1 className="text-3xl font-semibold text-center mb-5 text-bg-[#17252A]">
      Add New Election
      

    </h1>

    {msg && <p className="text-center text-green-500">{msg}</p>}


   

    <form onSubmit={submithandle}>
      <section className="  p-4 mb-8">
        <h2 className="text-xl font-semibold mb-4">Election Details</h2>

        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Election Name</label>
          <input
            ref={election_name_ref}
            name="election_name"
            type="text"
            placeholder="e.g. 2025 State Assembly"
            className="w-full border rounded-md px-3 py-2"
          />
        </div>


       
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Region</label>
          <input
             ref={region_ref}
             name="region"
            type="text"
            placeholder="type"
            // readOnly
            className="w-full border rounded-md px-3 py-2"
          />
        </div>

        
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">
              Start Date
            </label>
            <input
            ref={election_start_date_ref}
             name="election_start_date"
              type="date"
              className="w-full border rounded-md px-3 py-2"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">
              End Date 
            </label>
            <input
            ref={election_end_date_ref}
              name="election_end_date"
              type="date"
              className="w-full border rounded-md px-3 py-2"
            />
          </div>
        </div>

       
        
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            ref={election_desc_ref}
            rows="3"
            name="election_desc"
            placeholder="Brief description of the election…"
            className="w-full border rounded-md px-3 "
          ></textarea>
        </div>
      </section>

      <div className="text-center ">
        <button className="bg-[#3AAFA9] hover:bg-[#17252A] text-white px-6 py-2 rounded mr-4">
          Save Election
        </button>
        
      </div>
    </form>


      
      
     
  </div>

  </>

  
    

   
  
   );
}

