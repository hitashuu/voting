import React, { useState } from 'react'
import api from '../posts';
import { useNavigate } from 'react-router-dom';

function Card({ name,desc,candidatename,candidateparty,id,election_id,image}) {


    const[msg,setmsg]=useState("");
    const navigate=useNavigate();
    


    const onVote=async()=>{
        try{
            const res=await api.get("voteadded",{
                params:{id,election_id},
                withCredentials:true
            })

            setmsg(res.data.msg);
            
            navigate("/availablePolls")


        }

       


        
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
        {msg && <h1 className='text-center text-green-500'>{msg}</h1>}

        
        <div style={{
            border: '1px solid gray',
            borderRadius: '8px',
            padding: '16px',
            backgroundColor: 'white',
            color: 'black',
            maxWidth: '300px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
            <img 
                  src={`http://localhost:8000${image}`}
                style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '8px'
                }} 
            />
           
           <h4 className="m-0 mb-4 text-black-800">Election name: <span className='text-black-300'>{name}</span></h4>
          <h4 className="m-0 mb-4 text-black-800">Election desc: <span className='text-black-300'>{desc}</span></h4>
            <h4 className="m-0 mb-4 text-black-800">Candidate name: <span className='text-black-300'>{candidatename}</span></h4>
           <h4 className="m-0 mb-4 text-black-800">Candidate party: <span className='text-black-300'>{candidateparty}</span></h4>
            
            <button 
                onClick={onVote} 
                

                className="text-white border-none px-4 py-2 rounded cursor-pointer bg-[#3AAFA9] hover-bg-black"

            >
                Vote Now
            </button>
            
        </div>
        </>
    );
}



export default Card