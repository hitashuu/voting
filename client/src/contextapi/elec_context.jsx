import React, { useEffect,useState } from "react";

import { createContext,useContext } from "react";

import api from "../posts";

const ElectionContext=createContext();



export function ElectionProvider({children})
{
    console.log("i am first one");
    const [before,setbefore]=useState([]);
    const [after,setafter]=useState([]);
    const[msg,setmsg]=useState(null);
   

        const fetchElections=async()=>{
            console.log("ta")

         try{

            const res=await api.get("electionsadded",{withCredentials:true})
            console.log("data")
            console.log(res.data.before);
            setbefore(res.data.before);
            setafter(res.data.after);


         }
         catch(err){

           console.log("error on context") 
           setmsg(err.response.msg);
           setafter([]);
           setbefore([]);

         }
        }
        // fetchdatafun();

    // },[])
    return(
        <>
              <ElectionContext.Provider value={{before,after,msg,fetchElections}}>
                {children}
                </ElectionContext.Provider>
        </>
    )
}



export function useElection()
{
    console.log(" elec_contex");
    return useContext(ElectionContext)
}



