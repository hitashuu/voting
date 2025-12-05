import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
// import LoginModal from "../pages/Loginmodal";
import { LocalContext } from "../contextapi/local_context";
import { LocalContextProvider } from "../contextapi/local_context";
//import { useContext } from "react";

function Navbar() {
    const [isOpened, setIsOpened] = useState(false);
    
    

   
    const { role } = useContext(LocalContext);

    const{logout}=useContext(LocalContext);
    console.log("third");
    console.log(role)

   

    
   

return (

    <div>
        <nav className="bg-[#2F4F6F] p-4 shadow-lg flex justify-between items-center">
            {/* Voting App Mark */}
            <div className="text-gray-200 text-xl font-bold">Voting App</div>
            {/* Navigation Links */}
            <ul className="flex space-x-6 text-gray-200">
                
                <li>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive
                                ? "text-white "
                                : "text-black"
                        }
                    >
                        Home
                    </NavLink>
                </li>
                {role!="admin"  &&
                <li>
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            isActive
                                ? "text-white "
                                : "text-black"
                        }
                    >
                        Dashboard
                    </NavLink>
                </li>
 }
                
                {role=="user" &&
                <li>
                    <NavLink
                        to="/availablePolls"
                        className={({ isActive }) =>
                            isActive
                                ? "text-white "
                                : "text-black"
                        }
                    >
                        Available Polls
                    </NavLink>
                </li>
                }
                {(role=="user" || role=="superadmin" ) &&
                <li>
                    <NavLink
                        to="/pastpolls"
                        className={({ isActive }) =>
                            isActive
                                ? "text-white "
                                : "text-black"
                        }
                    >
                        Past Polls
                    </NavLink>
                </li>
                 }
                 {(role=="user" || role=="superadmin") &&
                 <li>
                   
                    <NavLink
                        to="/profile"
                        className={({ isActive }) =>
                            isActive
                               ? "text-white "
                                : "text-black"
                        }
                    >
                        Profile
                    </NavLink>
                </li>}
                
                {role=="admin" && 
                 <li>
                    <NavLink
                        to="/adminpanel"
                        className={({ isActive }) =>
                            isActive
                                ? "text-white "
                                : "text-black"
                        }
                    >
                        Admin
                    </NavLink>
                </li>
                }
                 {role=="admin" && 
                <li>
                    <NavLink
                        to="/addcandidates"
                        className={({ isActive }) =>
                            isActive
                                ? "text-white "
                                : "text-black"
                        }
                    >
                        Add Candidates
                    </NavLink>

                   
                </li>
                }
               {(role=="superadmin" ||role=="user") &&
                <li>
                    <NavLink
                        to="/updates"
                        className={({ isActive }) =>
                            isActive
                                ? "text-white "
                                : "text-black"
                        }
                    >
                        Update Details
                    </NavLink>
               
                   
                </li>
                }
                {logout=="false" &&
                 <li>
                    <NavLink
                        to="/login"
                        // localStorage.setItem('')
                        className={({ isActive }) =>
                            isActive
                                ? "text-white "
                                : "text-black"
                        }
                    >
                        Login
                    </NavLink>
                </li>
                }
                 

                 
                {logout=="true" &&
                 <li>
                    <NavLink
                        to="/logout"
                        className={({ isActive }) =>
                            isActive
                                ? "text-white "
                                : "text-black"
                        }
                    >
                        Logout
                    </NavLink>
                </li>



                 }
                
            </ul>

            {/* <div>
                <button
                    onClick={() => setIsOpened((prev) => !prev)}
                    className="bg-gray-700 text-gray-200 px-4 py-2 rounded hover:bg-gray-600 transition duration-300"
                >
                    Login
                </button>
            </div> */}

            {/* <LoginModal isOpened={isOpened} setIsOpened={setIsOpened}/> */}

            
        </nav>
    </div>
);
}

export default Navbar;
