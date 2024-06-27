import { useEffect, useState } from "react";
import Header from "../Components/Header";
import axios from "axios";
import { Link } from "react-router-dom"; // Assuming use of React Router for navigation

import { IoBarbell } from "react-icons/io5";
import { GiHotMeal } from "react-icons/gi";

const History = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        
        <div className="max-w-lg px-8 py-12 bg-white shadow-lg rounded-lg">
          <h1 className="text-4xl font-semibold text-center mb-8 text-gray-800">What would you like to see?</h1>
          <div className="flex flex-col gap-8 items-center">
            <Link to="/history/workouthistory" className="OptionCard w-full max-w-sm p-6 bg-blue-500 hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 text-white text-center rounded-lg shadow-lg flex justify-center items-center gap-3">
            <IoBarbell className="h-[50px] w-[50px]"/>
              <span className="text-2xl font-semibold">My Workout History</span>
            </Link>
            <Link to="/history/mealhistory" className="OptionCard w-full max-w-sm p-6 bg-green-500 hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105 text-white text-center rounded-lg shadow-lg flex justify-center items-center gap-3">
            <GiHotMeal className="h-[50px] w-[50px]"/>
              <span className="text-2xl font-semibold">My Meal History</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default History;
