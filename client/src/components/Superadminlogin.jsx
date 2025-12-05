import React from 'react'
import { useState } from 'react';
import api from "../posts";

import { useNavigate } from "react-router-dom";
import { LocalContext, LocalContextProvider } from '../contextapi/local_context';
import { useContext } from 'react';

import { useElection } from '../contextapi/elec_context';



function SuperAdminLogin() {

    const navigate = useNavigate();
    const [form, setForm] = useState({ username: "", password: "" })
    const [msg, setmsg] = useState("");
    const { setrole } = useContext(LocalContext);
    const { setlogout } = useContext(LocalContext);

    const { fetchElections } = useElection();
    

    const handleonchange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleonsubmit = async (e) => {


        e.preventDefault();


        try {
            const res = await api.post("superadminlogin", form, { withCredentials: true });
            console.log("superadmin login successfully");
            setmsg(res.data.msg);
            // localStorage.setItem("role",res.data.role);
            // localStorage.setItem("logout","true");

            setrole(res.data.role);
            setlogout("true");
            console.log("first");
            localStorage.setItem("role","super");

            if(res.status==200)
            {
                 await fetchElections(); 
                 console.log("hi")
            }
            


            navigate("/addadmins");
            
            
            
        }

        // catch (err) {

        //     console.log(err.response.data.msg);
        //     setmsg(err.response.data.msg);
           

        // }
        
      catch (err) {
     
      
  if (err.response && err.response.data && err.response.data.result) {
     setmsg(err.response.data.msg);
     
  } else {
    
    setmsg("Something went wrong");
  }
      }





    }

    return (

        <>

            <div className="fixed inset-0 flex justify-center items-center bg-opacity-10 backdrop-blur-md">




                <div className="bg-white p-8 rounded-lg w-96 relative shadow-2xl border border-gray-300">
                    {msg && <p className="mb-4 text-center text-green-500">{msg}</p>}


                    <form onSubmit={handleonsubmit}>



                        <div className="mb-6">
                            <label className="block text-sm font-semibold text-gray-800 mb-2">Admin name:</label>
                            <input
                                type="text"
                                name="username"
                                placeholder="Enter your Admin name"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                                value={form.username}
                                onChange={handleonchange}
                            /> </div>







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

        </>


    );
}

export default SuperAdminLogin