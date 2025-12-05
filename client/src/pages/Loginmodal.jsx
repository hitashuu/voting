import React from 'react'
import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import api from '../posts';
import { Link } from 'react-router-dom';

function Loginmodal() {
// if (!isOpened) return null;

// const handleClose = () => {
//     setIsOpened(false);
// };

 


  return (

      <>
      
       <p className="text-center text-bg-[#17252A] mb-4 text-xl ">Please choose your login type:</p>
      
    
    <div className=" inset-0 flex justify-center items-center bg-opacity-10 ">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg border border-gray-300">
        <h1 className="text-xl font-bold text-center mb-6">Select Login</h1>

        <div className="flex flex-col gap-4">
          <Link to="/superadminlogin" >
            <button className="w-full bg-gray-600  text-white py-2 rounded hover:bg-[#17252A]">
              Super Admin Login
            </button>
          </Link>

           <Link to="/adminlogin">
             <button className="w-full bg-gray-600  text-white py-2 rounded hover:bg-[#17252A]">
              Admin Login
            </button>
          </Link>

           <Link to="/voterlogin">
             <button className="w-full bg-gray-600  text-white py-2 rounded hover:bg-[#17252A]">
              Voter Login
            </button>
          </Link>
        </div>
      </div>
    </div>
    </>
  );
                 
}

export default Loginmodal