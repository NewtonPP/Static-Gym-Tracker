import express from "express"
import { AddExercise, deleteAllExercises, deleteExercise,getExercise,getExercises, updateExercise, upload } from "../Controller/exercise.controller.js"

export const ExercisesRouter = express.Router()

ExercisesRouter.post("/addexercise", upload.single("Image"),AddExercise)
ExercisesRouter.get("/getexercises",getExercises)
ExercisesRouter.get("/:id",getExercise)
ExercisesRouter.put("/:id",updateExercise)
ExercisesRouter.delete("/deleteexercise/:id",deleteExercise)
ExercisesRouter.delete("/deleteexercises",deleteAllExercises)