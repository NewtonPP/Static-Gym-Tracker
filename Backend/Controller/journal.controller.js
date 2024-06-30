import { JournalModel } from "../Model/Journal.model.js";

export const AddDay = async(req,res)=>{
    try {
        const Day = req.body;
        if(Day){
          const newJournal = await JournalModel.create(Day)  
          res.status(200).json(newJournal)
        }
    } catch (error) {
        res.status(500).json({error:"Internal Server Error"})
        console.log("Error in the AddDay controller",error)
    }
}   

export const GetDays = async(req,res)=>{
    try {
        const days = await JournalModel.find();
        if(days){
            res.status(200).json(days)
        }
    } catch (error) {
        res.status(500).json({error:"Internal Server Error"})
        console.log("Error in the GetDays Controller",error)
    }
}