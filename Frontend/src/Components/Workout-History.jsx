import { IoIosArrowBack } from "react-icons/io";
import { useEffect, useState } from "react";
import Header from "../Components/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

const WorkoutHistory = () => {
  const [isLoading, setisLoading]= useState(false);
  const [workouts, setWorkouts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchWorkouts = () => {
      setisLoading(true)
      axios.get("http://localhost:3000/api/workout/getexercises", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setWorkouts(response.data);
        setisLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching workouts:", error);
      });
    };

    fetchWorkouts();
  }, []);

  const handleBackClick=()=>{
    navigate("/history")
  }

  return (
    <>
      <Header />
      {
        isLoading ? <Loading/> :
      <div className="min-h-screen bg-gray-100">
      <div
            className="BackArrowContainer h-[50px] w-[50px] flex justify-center items-center rounded-full absolute top-[82px] left-[8px] hover:bg-gray-200 cursor-pointer"
            onClick={handleBackClick}
          >
            <IoIosArrowBack className="h-[30px] w-[30px]" />
          </div>

        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">Your Workout History</h1>
          {
            workouts.length === 0 && <div className="flex h-[140px] w-[400px] justify-center items-center flex-wrap relative left-[400px]">
              <p>Currently, you have no workout history</p>
              <p>You can add your workout day here</p>
              <button className="h-[50px] w-[200px] bg-blue-300 rounded-[10px] hover:bg-blue-400" onClick={()=>navigate("/addday")}>Add Day</button>
            </div>
          }

          {workouts.map((workout, index) => (
            <>
            {
              workout.User === localStorage.getItem("Id") &&
            <div key={index} className="bg-white shadow-lg rounded-lg p-6 mb-6">
              <p className="text-lg font-semibold mb-4 text-gray-800">On {new Date(workout.Date).toLocaleDateString()} you performed:</p>
              <div className="space-y-2">
                {workout.Exercises.map((exercise, index) => (
                  <p key={index} className="text-base text-gray-700">{exercise.sets} sets of {exercise.name}, each consisting of {exercise.reps} reps</p>
                ))}
              </div>
            </div>  
}
            </>
          ))}
          
        </div>
      </div>
    } 
    </>
  );
}

export default WorkoutHistory;
