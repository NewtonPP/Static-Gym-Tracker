import { ProgressModel } from "../Model/Progress.model.js";

export const AddProgress=async(req,res)=>{
    try {
        const ProgressData = req.body;
        if(!ProgressData.Weight || !ProgressData.BodyFat || !ProgressData.Date){
            return res.status(400).json({message:"All fields are required"})
        }
       const newProgress =  await ProgressModel.create(ProgressData)
        return res.status(200).json(newProgress)
    } catch (error) {
        res.status(500).json({error:"Internal Server Error"})
        console.log("Error in the AddProgress Controller",error)
    }
}

export const GetProgress = async(req,res)=>{
    try{
        const {id} = req.params
        const User = id
        const ProgressData = await ProgressModel.find({User});
        if(!ProgressData){
            return res.status(400).json({message:"No data found"})
        }
        res.status(200).json(ProgressData)
    }
    catch(error){
        res.status(500).json({error:"Internal Server Error"})
        console.log("Error in the GetProgress Controller",error)
    }
}