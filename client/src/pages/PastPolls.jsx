import React from "react";
import { useElection } from "../contextapi/elec_context";
import ElectionCard from "../components/ElectionCard";

function PastPolls() {
  const { before, after, msg } = useElection();

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      
      <section className="p-6 text-center bg-gray-100 rounded-3xl shadow-md">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">
          Browse through Past Elections and their Results
        </h1>
       
      </section>

     
      {msg && (
        <div className="text-center text-green-600 font-semibold text-lg">
          {msg}
        </div>
      )}

     
      <div className="space-y-12">
       
        

        
        <div className="bg-white rounded-3xl p-6 shadow-md">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 border-b-2 border-gray-200 pb-2">
            Past Elections
          </h2>
          <div className="flex flex-wrap gap-6 justify-center">
            {after.map((item, index) => (
              <ElectionCard
                key={index}
               
                past={true}
                name={item.election_name}
                desc={item.election_desc}
                start={item.election_start_date}
                end={item.election_end_date}
                region={item.region}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PastPolls;
