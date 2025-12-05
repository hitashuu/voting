import React, { useState,useRef } from 'react'
import axios from 'axios';
import api from "../posts";  
import { useNavigate } from 'react-router-dom';



function Register({update}) {

 // const image=useRef();



  const navigate=useNavigate();

  const [form,setForm]=useState({username:"",email:"",password:"",region:"",phoneno:"",address:"",pincode:"",name:"",image:null});
  const[msg,setMessage]=useState("");




  function handlechange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }


  //   const handleupdate=async(e)=>

      
      

      
  //  {
  //    e.preventDefault();
  //     try{

        
  //       const res=await api.post("update",form,{withCredentials:true});

  //       navigate("/");

  //     }
  //     catch(err)
  //     {
  //       if(err.response && err.response.data && err.response.data.msg)
  //       {
  //         console.log(err.response.msg);
  //         setMessage(err.response.msg);
  //       }
  //       else{
  //         setMessage("Something went wrong");
  //       }
  //     }
  // }


  const handlesubmit=async (e) => {
     console.log("logged");
     e.preventDefault();

     //const image= image.current.files[0];

    try{

       const formData = new FormData();
  formData.append("username", form.username);
  formData.append("email", form.email);
  formData.append("password", form.password);
  formData.append("region", form.region);
  formData.append("phoneno", form.phoneno);
  formData.append("address", form.address);
  formData.append("pincode", form.pincode);
  formData.append("name", form.name);
  formData.append("image", form.image);
      const res=await api.post("register",formData ,{withCredentials:true});
      console.log("Successfully registered");
      navigate("/voterlogin");
      
    }


 catch (err) {
     
      
  if (err.response && err.response.data && err.response.data.result) {
     setMessage(JSON.stringify(err.response.data.result));
     
  } else {
    
    setMessage("Something went wrong");
  }
    
  }
}


     return (
    <div className="max-w-md mx-auto mt-6 p-8 bg-white rounded-lg shadow-md">
  <h2 className="text-2xl font-semibold mb-6 text-center">Register</h2>

  {msg && <p className="mb-4 text-center text-green-500">{msg}</p>}
  <form onSubmit={update ? handleupdate : handlesubmit}>

 

    
    
    <div class="mb-4">
      <label for="username" class="block text-gray-700 font-medium mb-2">voter id (Usernme)  </label>
      <input
        type="text"
        id="username"
        name="username"
        placeholder="Enter your voter-id"
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={form.username}
        onChange={handlechange}
      />
    </div>
   

    <div class="mb-4">
      <label for="name" class="block text-gray-700 font-medium mb-2">Name </label>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Enter your name"
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={form.name}
        onChange={handlechange}
      />
    </div>

    
    <div class="mb-4">
      <label for="email" class="block text-gray-700 font-medium mb-2">Email</label>
      <input
        type="text"
        id="email"
        name="email"
        placeholder="Enter your state"
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={form.email}
        onChange={handlechange}
      />
    </div>

   
    

    


    


    <div class="mb-4">
      <label for="password" class="block text-gray-700 font-medium mb-2">Region</label>
      <input
        type="text"
        id="region"
        name="region"
        placeholder="Punjab/patiala"
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={form.region}
        onChange={handlechange}
      />
    </div>

    <div class="mb-4">
      <label for="password" class="block text-gray-700 font-medium mb-2">Pincode</label>
      <input
        type="text"
        id="pincode"
        name="pincode"
        placeholder="Enter your region pincode"
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={form.pincode}
        onChange={handlechange}
      />
    </div>

     <div class="mb-4">
      <label for="password" class="block text-gray-700 font-medium mb-2">Phone no</label>
      <input
        type="text"
        id="phoneno"
        name="phoneno"
        placeholder="Enter your Phoneno"
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={form.phoneno}
        onChange={handlechange}
      />
    </div>

     <div class="mb-4">
      <label for="password" class="block text-gray-700 font-medium mb-2">Address</label>
      <input
        type="text"
        id="address"
        name="address"
        placeholder="Enter your address"
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={form.address}
        onChange={handlechange}
      />
    </div>

    <div class="mb-4">
      <label for="password" class="block text-gray-700 font-medium mb-2">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Enter your password"
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={form.password}
        onChange={handlechange}
      />
    </div>

    <div class="mb-4">
      <label for="password" class="block text-gray-700 font-medium mb-2">Password</label>
      <input
        type="file"
        id="image"
        name="image"
        placeholder="Upload image"
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => setForm({ ...form, image: e.target.files[0] })}

       
      />
    </div>

    {!update &&
    <button
      type="submit"
      onClick={handlesubmit}
      class="w-full bg-gray-600  text-white py-3 rounded-lg hover:bg-[#17252A] transition-colors"
    >
      Register
    
    </button>
  }
    {update &&
    <button
      type="submit"
      
      class="w-full bg-gray-600  text-white py-3 rounded-lg hover:bg-[#17252A] transition-colors"
    >
      Update

    </button>
    }

    
  </form>
</div>

)
}

export default Register