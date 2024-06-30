import { useEffect, useState } from "react";
import Header from "../Components/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Journal = () => {
  const navigate = useNavigate();
  const [journal, setJournal] = useState([]);

  useEffect(() => {
    const fetchJournal = () => {
      axios.get("http://localhost:3000/api/journal/getdays", {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then((response) => {
        console.log(response.data);
        setJournal(response.data);
      });
    };
    fetchJournal();
  }, []);

  const HandleAddClick=()=>{
    navigate("/addday")
  }
  return (
    <>
      <Header />
      <div className="JournalPage min-h-screen w-full bg-gradient-to-r from-gray-100 to-gray-300 p-4 flex flex-col items-center justify-center">
        {
          journal.length === 0 && 
          <div className="flex flex-col items-center">
            <div className="text-center text-xl mb-4">You have not added anything in your journal</div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors" onClick={HandleAddClick}>Add Here</button>
          </div>
        }
        <div className="max-w-4xl w-full mx-auto">
          {
            journal.map((element, index) => (
              <div key={index} className="journal-entry bg-white shadow-lg rounded-lg p-6 mb-6 transition-transform transform hover:-translate-y-1 hover:shadow-2xl">
                <h1 className="text-2xl font-bold mb-2">{element.Date}</h1>
                <p className="text-gray-700">{element.Day}</p>
              </div>
            ))
          }
        </div>
      </div>
    </>
  );
}

export default Journal;
