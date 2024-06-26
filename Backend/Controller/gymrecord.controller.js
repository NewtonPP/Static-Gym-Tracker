import { WorkoutModel } from "../Model/GymRecord.model.js";


//Function to add a workout
export const AddWorkout=async(req,res)=>{
    try {
        const WorkoutInfo = req.body
       const newWorkout = await WorkoutModel.create(WorkoutInfo)
        res.status(200).json(newWorkout)
    } catch (error) {
        res.status(500).json({error:"Internal Server Error"})
        console.log("Error in the AddWorkout controller",error)
    }
}

//Function to get all the workouts the user added
export const GetAllWorkouts = async(req,res)=>{
    try {
        const Workouts = await WorkoutModel.find();
        res.status(200).json(Workouts)
    } catch (error) {
            res.status(500).json({error:"Internal Server Error"})
            console.log("Error in the GetAllWorkouts controller")
    }
}

//Function to get a workout 
export const GetAWorkout = async(req,res)=>{
    try {
        const {Date} = req.body;
        const FindWorkout = await WorkoutModel.findOne({Date});
        if(FindWorkout){
            return res.status(500).json(FindWorkout)
        }
        else{
            throw Error
        }
    } catch (error) {
        res.status(500).json({error:"Internal Server Error"})
        console.log("Error in the Get a Workout Controller",error)
    }
}

//Function to get workouts based on Workout
export const GetExercises = async (req,res)=>{
    try {
        const {Name}= req.body;
        let WorkoutArray=[];
        const Exercises = await WorkoutModel.find({Name});
        if(Exercises){
            res.status(200).json(Exercises)
        }
    } catch (error) {
        res.status(500).json({error:"Internal Server Error"})
        console.log("Error in the GetExercises controller",error)
    }
}

//Function to delete a workout 
export const DeleteAWorkout = async(req,res)=>{
    try {
        const {_id} = req.body;
        const FindWorkout = await WorkoutModel.findByIdAndDelete(_id);
        return res.staus(200).json(FindWorkout)
    } catch (error) {
        res.status(500).json({error:"Internal Server Error"})
        console.log("Error in the Delete workout controller",error)
    }
}

//Function to delete all the workouts
export const DeleteAllWorkouts = async(req,res)=>{
    try {
        const DeletedWorkouts = await WorkoutModel.DeleteMany();
        return res.status(200).json(DeletedWorkouts)
    } catch (error) {
        res.status(500).json({error:"Internal Server Error"})
        console.log("Error in the DeleteAllWorkouts controller",error)
    }
}