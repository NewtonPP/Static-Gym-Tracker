import { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import Header from "../Components/Header";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import Loading from '../Components/Loading'; // Assuming you have a Loading component

const AddDay = () => {
  const [isLoading, setisLoading] = useState(false);
  const UserId = localStorage.getItem("Id");
  const [workoutName, setWorkoutName] = useState("");
  const [date, setDate] = useState(new Date());
  const [exercises, setExercises] = useState([{ name: "", sets: "", reps: "" }]);
  const [exerciseFields, setExerciseFields] = useState(1); // Tracks number of exercise fields
  const [meals, setMeals] = useState([{ name: '', calories: '', protein: '' }]);
  const [mealFields, setMealFields] = useState(1); // Tracks number of meal fields


  const handleExerciseChange = (index, event) => {
    const { name, value } = event.target;
    const newExercises = [...exercises];
    newExercises[index][name] = value;
    setExercises(newExercises);
  };

  const addExerciseField = () => {
    setExercises([...exercises, { name: "", sets: "", reps: "" }]);
    setExerciseFields(exerciseFields + 1);
  };

  const removeExerciseField = (index) => {
    if (exerciseFields > 1) {
      const values = [...exercises];
      values.splice(index, 1);
      setExercises(values);
      setExerciseFields(exerciseFields - 1);
    }
  };

  const handleMealChange = (index, event) => {
    const { name, value } = event.target;
    const newMeals = [...meals];
    newMeals[index][name] = value;
    setMeals(newMeals);
  };

  const addMealField = () => {
    setMeals([...meals, { name: '', calories: '', protein: '' }]);
    setMealFields(mealFields + 1);
  };

  const removeMealField = (index) => {
    if (mealFields > 1) {
      const values = [...meals];
      values.splice(index, 1);
      setMeals(values);
      setMealFields(mealFields - 1);
    }
  };

  const handleExerciseSubmit = async () => {
    setisLoading(true);
    const WorkoutRecord = {
      User: UserId,
      Name: workoutName,
      Date: date,
      Exercises: exercises,
      Meals: meals
    };

    try {
      await axios.post("http://localhost:3000/api/workout/addrecord", WorkoutRecord, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      setisLoading(false);
    } catch (error) {
      console.error("There was an error saving the data!", error);
      setisLoading(false);
    }
  };

  const handleMealSubmit = async () => {
    setisLoading(true);
    const CalorieRecord = {
      User: UserId,
      Date: date,
      Meals: meals
    };

    try {
      await axios.post("http://localhost:3000/api/meal/addcaloriecount", CalorieRecord, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      setisLoading(false);
    } catch (error) {
      console.error("There was an error saving the data!", error);
      setisLoading(false);
    }
  };

  return (
    <>
      <Header />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="AddDayPage min-h-[600px] w-full bg-[#F0F7F4] p-5">
          <div className="flex items-center mb-6">
            <h1 className="mr-4">Date:</h1>
            <DatePicker className="mx-2" selected={date} onChange={(date) => setDate(date)} />
          </div>
          <div className="Question flex flex-col items-center mb-10">
            <h1 className="text-[25px] font-[700] mb-4">Hi, how was your day?</h1>
            <input type="text" className="bg-gray-200 outline-none h-[40px] w-[80%] max-w-[500px] px-2 mb-4 rounded-md" placeholder="Describe your day..." />
            <button type="submit" className="bg-blue-500 text-white h-[40px] w-[100px] hover:bg-blue-600 rounded-md">Done</button>
          </div>

          <div className="AddExercise flex flex-col items-center mb-10">
            <h2 className="text-[22px] font-medium mb-4">Workout Details</h2>
            {exercises.map((exercise, index) => (
              <div key={index} className="flex items-center mb-4">
                <input 
                  type="text" 
                  name="name" 
                  value={exercise.name} 
                  onChange={event => handleExerciseChange(index, event)} 
                  placeholder="Name of Exercise"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 mr-2"
                />
                <input 
                  type="number" 
                  name="sets" 
                  value={exercise.sets} 
                  onChange={event => handleExerciseChange(index, event)} 
                  placeholder="Sets"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 mr-2"
                />
                <input 
                  type="number" 
                  name="reps" 
                  value={exercise.reps} 
                  onChange={event => handleExerciseChange(index, event)} 
                  placeholder="Reps"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 mr-2"
                />
                {index === exerciseFields - 1 && (
                  <button 
                    type="button" 
                    onClick={addExerciseField} 
                    className="bg-green-500 text-white h-[40px] w-[40px] hover:bg-green-600 rounded-md flex justify-center items-center mr-2"
                  >
                    +
                  </button>
                )}
                {exerciseFields > 1 && (
                  <button 
                    type="button" 
                    onClick={() => removeExerciseField(index)} 
                    className="bg-red-500 text-white h-[40px] w-[40px] hover:bg-red-600 rounded-md flex justify-center items-center"
                  >
                    X
                  </button>
                )}
              </div>
            ))}
            <button 
              type="button" 
              onClick={handleExerciseSubmit} 
              className="bg-blue-500 text-white h-[40px] w-[200px] hover:bg-blue-600 rounded-md"
            >
              Submit Workout
            </button>
          </div>

          <div className="AddMeals flex flex-col items-center mb-10">
            <h2 className="text-[22px] font-medium mb-4">Meals</h2>
            {meals.map((meal, index) => (
              <div key={index} className="flex items-center mb-4">
                <input 
                  type="text" 
                  name="name" 
                  value={meal.name} 
                  onChange={event => handleMealChange(index, event)} 
                  placeholder="Meal Name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 mr-2"
                />
                <input 
                  type="number" 
                  name="calories" 
                  value={meal.calories} 
                  onChange={event => handleMealChange(index, event)} 
                  placeholder="Calories"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 mr-2"
                />
                <input 
                  type="number" 
                  name="protein" 
                  value={meal.protein} 
                  onChange={event => handleMealChange(index, event)} 
                  placeholder="Protein (g)"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 mr-2"
                />
                {index === mealFields - 1 && (
                  <button 
                    type="button" 
                    onClick={addMealField} 
                    className="bg-green-500 text-white h-[40px] w-[40px] hover:bg-green-600 rounded-md flex justify-center items-center mr-2"
                  >
                    +
                  </button>
                )}
                {mealFields > 1 && (
                  <button 
                    type="button" 
                    onClick={() => removeMealField(index)} 
                    className="bg-red-500 text-white h-[40px] w-[40px] hover:bg-red-600 rounded-md flex justify-center items-center"
                  >
                    X
                  </button>
                )}
              </div>
            ))}
            <button 
              type="button" 
              onClick={handleMealSubmit} 
              className="bg-blue-500 text-white h-[40px] w-[140px] hover:bg-blue-600 rounded-md"
            >
              Submit Meals
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default AddDay;
