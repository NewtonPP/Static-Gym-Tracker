import { useEffect, useState } from "react"
import Header from "./Header"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import { format } from 'date-fns';
import DatePicker from "react-datepicker";

const MealHistory = () => {
    const navigate = useNavigate();
    const [Intake, setIntake] = useState([]);
    const [date, setDate] = useState(new Date());
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

    const HandleSearchClick=()=>{
      const formattedDate = format(date, 'M/d/yyyy');
      axios.post("http://localhost:3000/api/meal/getmeal", { Date: formattedDate }, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then((response) => {
        setIntake(response.data)
      })
      .catch((error) => {
        console.error("Error fetching workout:", error);
      });
    }


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
           {
                Intake.length >= 1 &&
                <div className="flex h-[20px] w-[500px] mb-10">
                  <p>Search your workout here</p>
                  <DatePicker className="mx-2 px-2" selected={date} onChange={(date) => setDate(date)} />
                  <button className="bg-yellow-400 h-[25px] w-[80px] rounded-[10px] hover:bg-yellow-500" onClick={HandleSearchClick}>Search</button>
                </div>
              }

{Intake.map((element, index) => (
  element.User === localStorage.getItem("Id") && (
    <div key={index} className="bg-white shadow-lg rounded-lg p-6 mb-6">
      <p className="text-lg font-semibold mb-4 text-gray-800">On {new Date(element.Date).toLocaleDateString()} you consumed:</p>
      <div className="space-y-2">
        {element.Meals.map((meal, mealIndex) => (
          <div key={mealIndex}>
            <p className="text-base text-gray-700 font-[700]">{meal.name}</p>
            <p>Total Calories: {meal.calories}</p>
            <p>Total Protein: {meal.protein}</p>
          </div>
        ))}
      </div>
    </div>
  )
))}



        </div>

    </div>
}
    </>
  )
}

export default MealHistory
