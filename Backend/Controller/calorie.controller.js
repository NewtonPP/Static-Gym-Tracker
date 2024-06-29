import { MealModel } from "../Model/Calorie.model.js";

export const AddMealData =async(req,res)=>{
    try {
        const MealData = req.body;
        if(!MealData.User){
            return res.status(400).json({message:"Not a valid user"})
        }
        const newMealData = await MealModel.create(MealData)
        return res.status(200).json(newMealData)
    } catch (error) {
        res.status(500).json({error:"Internal Server Error"})
        console.log("Error in the AddMealData controller",error)
    }
}

export const getMealData = async(req,res)=>{
    try {
        const MealData = await MealModel.find();
        res.status(200).json(MealData)
    } catch (error) {
        res.status(500).json({error:"Internal Server Error"})
        console.log("Error in the GetMealData controller",error)
    }
}

export const getMeal = async (req,res)=>{
    try {
        const {Date} = req.body 
        const Meal = await MealModel.find({Date})
        if(Meal){
            res.status(200).json(Meal)
        }
        else{
            throw Error
        }
    } catch (error) {
        res.status(500).json({error:"Internal Server Error"})
        console.log("Error in the GetMeal controller",error)
    }
}

export const DeleteMealData =async (req,res)=>{
    try {
        const {_id} =req.body
        const MealData = await MealModel.findOneAndDelete({_id})
        res.status(200).json(MealData)
    } catch (error) {
        res.status(500).json({error:"Internal Server Error"})
        console.log("Error in the DeleteMealData controller",error)
    }
}

export const DeleteAllMealData = async (req,res) =>{
    try {
        const DeletedMealData = await MealModel.deleteMany();
        res.status(200).json(DeletedMealData)
    } catch (error) {
        res.status(500).json({error:"Internal Server Error"})
        console.log("Error in the DeleteAllMealData controller",error)
    }
}