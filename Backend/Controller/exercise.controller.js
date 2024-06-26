import { ExerciseModel } from "../Model/Exercises.model.js";
import multer from "multer"
import path from "path"
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const AddExercise = async (req,res)=>{
    try {
        const {Name, PartInvolved, Instructions} = req.body;
        console.log(req.file)
        const Image = req.file ? req.file.path: null;
        console.log(Image)
        const newExercise = await ExerciseModel.create({
            Name,
            PartInvolved,
            Instructions,
            Image
        })
        if(newExercise){
            return res.status(200).json(newExercise)
        }
        else{
            throw Error
        }
    } catch (error) {
        res.status(500).json({error:"Internal Server Error"})
        console.log("Error in the AddExercise Error", error)
    }
}

export const getExercise =async(req,res)=>{
    try {
    const {Name, PartInvolved} = req.body;
    const {id} = req.params
    const getExercise = await ExerciseModel.findById(id);
    if(getExercise){
        return res.status(200).json(getExercise)
    }
    
    } catch (error) {
        res.status(500).json({error:"Internal Server Error"})
        console.log("Error in the GetExercise controller",error)
    }
}

export const getExercises = async (req,res)=>{
    try {
        const getExercises = await ExerciseModel.find();
        if(getExercises){
            res.status(200).json(getExercises)
        }
        else{
            throw Error
        }
    } catch (error) {
        res.status(500).json({error:"Internal Server Error"})
        console.log("Error in the GetExercises controller",error)
    }
}

export const updateExercise = async (req,res)=>{
    try {
        const Exercisedata = req.body;
        const {id} = req.params
        const updatedExercise = await ExerciseModel.findByIdAndUpdate(id,Exercisedata,{new:true})
        if(updatedExercise){
            res.status(200).json(updatedExercise)
        }
        else{
            throw Error
        }
    } catch (error) {
        res.status(500).json({error:"Internal Server Error"})
        console.log("Error in the UpdateExercise controller",error)
    }
}

export const deleteExercise = async (req,res)=>{
    try {
        const {_id} = req.params;
        const deletedExercise = await ExerciseModel.deleteOne(_id)
        if(deletedExercise){
            res.status(200).json(deletedExercise)
        }
        else{
            throw Error
        }
    } catch (error) {
        res.status(500).json({error:"Internal Server Error"})
        console.log("Error in the deleteExercise controller",error)
    }
}

export const deleteAllExercises = async (req,res)=>{
    try {
        const deletedExercises = await ExerciseModel.deleteMany()
        if(deletedExercises){
            res.status(200).json(deletedExercises)
        }   
        else{
            throw Error
        }
    } catch (error) {
        res.status(500).json({error:"Internal Server Error"})
        console.log("Error in the deleteExercises controller",error)
    }
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/Images"); // Ensure this path exists
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      const ext = path.extname(file.originalname);
      cb(null, file.fieldname + '-' + uniqueSuffix +ext)
    }
  })
  
export const upload = multer({ storage: storage })