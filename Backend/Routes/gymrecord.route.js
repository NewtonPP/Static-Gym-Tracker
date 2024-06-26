import express from "express"
import { AddWorkout, DeleteAWorkout, DeleteAllWorkouts, GetAWorkout, GetAllWorkouts, GetExercises } from "../Controller/gymrecord.controller.js";

export const WorkoutRouter = express.Router();

WorkoutRouter.post("/addrecord",AddWorkout)
WorkoutRouter.get("/getallworkouts",GetAllWorkouts)
WorkoutRouter.get("/getworkout",GetAWorkout)
WorkoutRouter.get("/getexercises",GetExercises)
WorkoutRouter.delete("/deleteworkout",DeleteAWorkout)
WorkoutRouter.delete("/deleteallworkouts",DeleteAllWorkouts)