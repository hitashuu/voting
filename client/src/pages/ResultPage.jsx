import React from 'react'
import { Bar, Pie } from 'react-chartjs-2';
import { useEffect ,useState} from 'react';
import api from '../posts';
import { useLocation } from 'react-router-dom';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from 'chart.js';

function ResultPage() {
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const location=useLocation();
const ans=location.state;
const id=ans.id;
const election=ans.election;
console.log(election)

const[data,setdata]=useState([]);
const[total,settotal]=useState(0);
const[msg,setmsg]=useState("");




const fetchme=async()=>{

    try{

        const res=await api.get("results",{
            params:{id},
            withCredentials:true
            
           
        });

        console.log("good");
        setdata(res.data.result);
        settotal(res.data.total);
       


        
    }

    catch(err)
    {
       setmsg("something went wrong");

    }

    

}





useEffect(()=>{

    fetchme();

},[]);




return (
    <div className="p-5 font-sans bg-gray-100 min-h-screen flex justify-center items-center">
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-4xl">
            <h1 className="text-2xl font-bold mb-4">Election Results</h1>
             <h1 className="text-2xl font-bold mb-4 text-[#3AAFA9]">Election name: {election}</h1>
            <p className="text-red-600 font-semibold mb-6">Voting Closed</p>

            <div className="mt-6">
                {/* <h2 className="text-xl font-semibold mb-4">Results Overview</h2> */}
                {msg && <p className='text-center'>{msg}</p>}
                

                <h3 className="text-lg font-medium mb-4">Ranked Choice Voting Table</h3>

                
                <table className="w-full border-collapse mb-6">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">Rank</th>
                            <th className="border border-gray-300 px-4 py-2">Candidate Name</th>
                            <th className="border border-gray-300 px-4 py-2">Candidate Party</th>
                            <th className="border border-gray-300 px-4 py-2">Votes</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        {data.map((item,index)=>
                        (
                        <tr>
                            <td className="border border-gray-300 px-4 py-2">{index+1}</td>
                            <td className="border border-gray-300 px-4 py-2">{item.candidate_name}</td>
                            <td className="border border-gray-300 px-4 py-2">{item.candidate_party}</td>
                            <td className="border border-gray-300 px-4 py-2">{item.votes}</td>
                        </tr>
                         ))}
                        
                    </tbody>
                   
                </table>
                 

                <h3 className="text-lg font-medium mb-2">Total Votes Cast</h3>
                <p className="mb-4">{total}</p>

                <p className="italic text-gray-600">
                    Note: All votes were cast anonymously to ensure voter privacy.
                </p>
            </div>
        </div>
    </div>
);
}

export default ResultPage