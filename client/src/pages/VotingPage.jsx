import React from 'react';
import Card from '../components/Card';
import { useState,useEffect } from 'react';
import api from '../posts';
import { useLocation } from 'react-router-dom';

 
function VotingPage() {

    // const[impt,setimpt]=[false]
    //  if (impt === false) {
    //     return <h1 className='text-center text-3xl'>You cant vote like this,you must vote therough elections and candidates</h1>; 
    // }

    const[data,SetData]=useState([]);
    const[msg,setMsg]=useState("");
    const[electionname,setelectionname]=useState("");
    const[electiondesc,setelectiondesc]=useState("");

    const location=useLocation();
    const ans=location.state;
    const id=ans.id;
    console.log("id election:", id);

    const fetchcandidates=async()=>{
        try{
            const res=await api.get("candidatesadded",{
                params:{id},
                withCredentials:true});

                console.log(res.data.election_desc);
           
            SetData(res.data.result);
            setelectionname(res.data.election_name);
            setelectiondesc(res.data.election_desc);
            console.log(res.data.result)
            
            


        }



          catch (err) {
     
      
  if (err.response && err.response.data && err.response.data.msg) {
      setMsg(err.response.data.result);
     
  } else {
    
    setMsg("Something went wrong");
  }

    }

}



    useEffect(()=>{
        fetchcandidates();
    },[])



    

    return (

        

         <>
        

        
        <h1 className='text-center text-3xl'> Vote here</h1>
        <div className=" min-h-screen p-5">
            <div className="text-black max-w-3xl mx-auto">
                {msg && <p className="text-center">{msg}</p>}
                
                
                <div className="my-5">
                    <h2 className="text-xl font-semibold">Instructions</h2>
                    <p className="text-gray-600">Select your preferred candidate below.</p>
                </div>
                <div className="my-5">
                    <h2 className="text-xl font-semibold">Candidates</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {data.map((item,index)=>(
                           <Card key={index} image={item.image} election_id={id} id={item.id} name={electionname} desc={electiondesc}  candidatename={item.candidate_name} candidateparty={item.candidate_party} />
                        ))}
                       
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default VotingPage;