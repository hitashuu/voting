import api from "../posts";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";


import { useElection } from '../contextapi/elec_context';
import { LocalContext } from "../contextapi/local_context";

function Logout()
{
    const[msg,setmsg]=useState("");
    const navigate=useNavigate();
    const { setlogout } = useContext(LocalContext);
    const{ setrole}=useContext(LocalContext);
     const { fetchElections } = useElection();
    const handleclick=async()=>{
        console.log("yes")
        const res=await api.get("logout",{withCredentials:true})
        localStorage.removeItem("role");
        // localStorage.setItem("logout","false");
        // setmsg(res.data.msg);
        setlogout("false");
        setrole("");
        if(res.status==200)                                         
            {
                 await fetchElections(); 
                 console.log("hi logout ")
            }


        navigate("/login");
    }


    return(
    <>
    {msg && <h1 className="text-center">{msg}</h1>}
    <>
  {msg && <h1 className="text-center text-green-600 font-semibold">{msg}</h1>}

  <div className="flex flex-col items-center justify-center min-h-screen">
    <div className="bg-white shadow-lg rounded-2xl p-8 w-96 text-center">
      <h1 className="text-xl font-bold text-gray-800 mb-4">
        Are you sure you want to logout?
      </h1>

      <div className="flex justify-center gap-4">
        <button
          onClick={handleclick}
          className="px-5 py-2 bg-red-600 text-white font-medium rounded-lg shadow-md hover:bg-red-700 transition duration-200"
        >
          Yes, Logout
        </button>

        <button
          onClick={() => navigate("/")}
          className="px-5 py-2 bg-gray-300 text-gray-800 font-medium rounded-lg shadow-md hover:bg-gray-400 transition duration-200"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</>

        
    </>

    );
    

}

export default Logout