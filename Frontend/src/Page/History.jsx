import { useEffect, useState } from "react";
import Header from "../Components/Header";
import axios from "axios";

const History = () => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const fetchWorkouts = () => {
      axios.get("http://localhost:3000/api/workout/getexercises", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setWorkouts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching workouts:", error);
      });
    };

    fetchWorkouts();
  }, []);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">Your Workout History</h1>

          {workouts.map((workout, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-6 mb-6">
              <p className="text-lg font-semibold mb-4 text-gray-800">On {new Date(workout.Date).toLocaleDateString()} you performed:</p>
              <div className="space-y-2">
                {workout.Exercises.map((exercise, index) => (
                  <p key={index} className="text-base text-gray-700">{exercise.sets} sets of {exercise.name}, each consisting of {exercise.reps} reps</p>
                ))}
              </div>
            </div>  
          ))}
        </div>
      </div>
    </>
  );
}

export default History;
