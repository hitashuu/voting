import React from 'react'
import { useState,useEffect } from 'react'
import api from '../posts';
import { useNavigate } from 'react-router-dom';


function Profile() {

  const navigate=useNavigate();

  // const changedetails=()=>{
  //   console.log("change it");
  //   navigate("/registration")
  // }

  
    const [data, setData] = useState({});
    const[msg,setMsg]=useState("");

    const fetchdata=async()=>{
      try{
        const res=await api.get("profile",{withCredentials:true});
        setData(res.data.result);
        console.log(data.image);
      }

    

      catch (err) {
     
      
  if (err.response && err.response.data && err.response.data.result) {
     setMsg(JSON.stringify(err.response.data.msg)); 
     
  } else {
    
    setMsg("Something went wrong");
  }

      
    }
  }

 useEffect(()=>{
  
  fetchdata();
 },[]);

  return (

    <div className="flex justify-center items-center my-50 ">

      {/* <h1 className='text-center text-3xl font-semibold mt-6 mb-8'>Want to change details?</h1>
       <button onClick={changedetails}>click here</button> */}
        <div className="p-8 max-w-xl bg-white rounded-lg shadow-md">
          

           {msg && <h1 className='text-center text-green-500'>{msg}</h1>}
          


           <img
  src={`http://localhost:8000${data.image}`}
  alt="Profile"
  className="block mx-auto"
/>


            
            {/* <h2 className="text-center text-3xl font-semibold mt-6 mb-8">{data.username}</h2> */}
            <p className="text-gray-700 text-lg"><strong>Voter id:</strong> {data.username}</p>
             <p className="text-gray-700 text-lg"><strong>Name:</strong> {data.name}</p>
            <p className="text-gray-700 text-lg"><strong>Phone Number:</strong> {data.phoneno}</p>
            <p className="text-gray-700 text-lg"><strong>Email:</strong> {data.email}</p>
          
            <p className="text-gray-700 text-lg"><strong>Address:</strong> {data.address}</p>
            <p className="text-gray-700 text-lg"><strong>Region:</strong> {data.region}</p>
             <p className="text-gray-700 text-lg"><strong>Pincode:</strong> {data.pincode}</p>
        </div>

        

    </div>

    
  )
}

export default Profile