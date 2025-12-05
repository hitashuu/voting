import React from "react";
import { useState } from "react";
import api from "../posts"; 


function Addadmins()
{

 

 
  

  const[form,setform]=useState({region:"",password:""})
  const[msg,setmsg]=useState("");

  const handlechange=(e)=>{

    setform({...form,[e.target.name]:e.target.value})

  }

  const handlesubmit=async (e)=>{
    e.preventDefault();

    try{
      const res= await api.post("addadmins",form,{withCredentials: true});
      console.log("admin added successfully");
      setmsg(res.data.msg);
      setform({region:"",password:""})


    }

    catch (err) {
      setmsg(JSON.stringify(err.response.data.result)); 
      
  if (err.response && err.response.data && err.response.data.result) {
    setmsg(err.response.data.result);
     
  } else {
    
    setmsg("Something went wrong");
  }
}



  }

  
    return (
      <>
       {msg && <h1 className="text-center text-red-500">{msg}</h1>}
    <form onSubmit={handlesubmit} className="max-w-md mx-auto mt-10 space-y-4">
      

      <div>
        <label className="block">Add region</label>
        <input
          type="text"
          name="region"
          className="border border-gray-300 rounded w-full p-2"
          onChange={handlechange}
          value={form.region}
        />
      </div>

      <div>
        <label className="block">Password</label>
        <input
          type="password"
          name="password"
          className="border border-gray-300 rounded w-full p-2"
          onChange={handlechange}
          value={form.password}
         
        />
      </div>

      <button type="submit" className="bg-[#3AAFA9] hover:bg-[#17252A] text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>

    </>
  );
    
}

export default Addadmins;