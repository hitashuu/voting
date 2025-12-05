import React, { createContext, useEffect, useState } from "react";

const LocalContext = createContext();

const LocalContextProvider = ({ children }) => {
  console.log("yesi am on local context beacuse it will render for the first time always and then on any updates in state")
  const [role, setrole] = useState();
  const [logout, setlogout] = useState("false");
  console.log("second")
  
  return (
    
    <LocalContext.Provider value={{ role, setrole,logout,setlogout }}>
      {children}
    </LocalContext.Provider>
  );
};

export { LocalContext, LocalContextProvider };
