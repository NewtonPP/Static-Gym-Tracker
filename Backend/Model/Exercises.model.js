import mongoose from "mongoose"

const ExerciseSchema = mongoose.Schema({
    Name:{
        type:String,
        unique:true
    },
    PartInvolved:{
        type:String
    },
    Instructions:{
        type:String
    },
    Image:{
        type:String
    }
}) 

export const ExerciseModel = mongoose.model("Exercise", ExerciseSchema)