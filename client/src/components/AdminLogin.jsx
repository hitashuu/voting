import React from 'react'
import { useState } from 'react';

import api from '../posts';
import {useNavigate} from 'react-router-dom';
import { LocalContext, LocalContextProvider } from '../contextapi/local_context';
import {useContext} from 'react';

import { useElection } from '../contextapi/elec_context';

function AdminLogin() {

const navigate = useNavigate();

 const { fetchElections } = useElection();

const[form,setForm]=useState({region:"",password:""})
const[msg,setMessage]=useState("");

  const { setrole } = useContext(LocalContext);
  const {setlogout}=useContext(LocalContext);

const handleonchange =(e)=>{
     setForm({ ...form, [e.target.name]: e.target.value });
};

 const handleonsubmit= async (e)=>{
    

    e.preventDefault();
    try{
        const res= await api.post("adminlogin",form,{withCredentials: true});
        console.log("Login successful response:", res.data);
        setrole("admin");
        setlogout("true");
        localStorage.setItem("role","admin");

        // if(res.status==200)
        //     {
        //          await fetchElections(); 
        //          console.log("hi")
        //     }
        navigate("/adminpanel",{state:{"region":res.data.region}})

       
        

    }

    catch(err)
    {
       
       
       console.log("error");
    //    console.log(err.response.data.msg)
    //    setMessage(err.response.data.msg);

    }
}

return (
    <div className="fixed inset-0 flex justify-center items-center bg-opacity-10 backdrop-blur-md">
        <div className="bg-white p-8 rounded-lg w-96 relative shadow-2xl border border-gray-300">
            
            {msg && <p className="mb-4 text-center text-green-500">{msg}</p>}
           
            <form onSubmit={handleonsubmit}>
               
                
                <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Region:</label>
                    <input
                        type="text"
                        name="region"
                        placeholder="Enter your region"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                         value={form.region}
                        onChange={handleonchange}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Password:</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                        value={form.password}
                        onChange={handleonchange}
                    />
                </div>
                
                <button
                    type="submit"
                    className="w-full py-3 bg-gray-800 text-white rounded-md hover:bg-gray-900"
                >
                    Login
                </button>
            </form>
        </div>
    </div>
);
}

export default AdminLogin;