import { useEffect, useState } from "react"
import Header from "./Header"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
const MealHistory = () => {
    const navigate = useNavigate();
    const [Intake, setIntake] = useState([]);
    const [isLoading, setisLoading] =useState(false)
    useEffect(()=>{
        const FetchMealData = ()=>{
          setisLoading(true)
            axios.get("http://localhost:3000/api/meal/getmealdata",{
                headers:{
                    "Content-Type":"application/json"
                }
            })
            .then((response)=>{
                setIntake(response.data)
                setisLoading(false)
            })
        }
        FetchMealData()
    },[])

  return (
    <>
    <Header/>
    {
      isLoading ? <Loading/> :
    <div className="min-h-screen bg-gray-100">

        <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">Your Meal History</h1>

          {
            Intake.length === 0 && <div className="flex h-[140px] w-[395px] justify-center items-center flex-wrap relative left-[400px]">
              <p>Currently, you have no Meal history</p>
              <p>You can add your Meal here</p>
              <button className="h-[50px] w-[200px] bg-blue-300 rounded-[10px] hover:bg-blue-400" onClick={()=>navigate("/addday")}>Add Meal</button>
            </div>
          }

        {Intake.map((element, index) => (
            <>
            {  
                element.User === localStorage.getItem("Id") &&
            <div key={index} className="bg-white shadow-lg rounded-lg p-6 mb-6">
              <p className="text-lg font-semibold mb-4 text-gray-800">On {new Date(element.Date).toLocaleDateString()} you consumed:</p>
              <div className="space-y-2">
                {element.Meals.map((meal, index) => (
                    <>
                  <p key={meal} className="text-base text-gray-700 font-[700]">{meal.name}</p>
                  <p key={meal.calorie}>Total Calories: {meal.calories}</p>
                  <p key={meal.protein}>Total Protein: {meal.protein}</p>
                 
                  </>
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
  )
}

export default MealHistory
