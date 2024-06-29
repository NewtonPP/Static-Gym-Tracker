import express from "express"
import { AddMealData, DeleteAllMealData, DeleteMealData, getMeal, getMealData } from "../Controller/calorie.controller.js";

export const MealRouter = express.Router();

MealRouter.post("/addcaloriecount",AddMealData)
MealRouter.get("/getmealdata",getMealData)
MealRouter.post("/getmeal",getMeal)
MealRouter.delete("/deletemealdata",DeleteMealData)
MealRouter.delete("/deleteallmealdata",DeleteAllMealData)
