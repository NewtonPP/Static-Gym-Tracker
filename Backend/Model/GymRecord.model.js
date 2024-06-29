import mongoose, { Schema, mongo } from "mongoose"

const GymRecordSchema = mongoose.Schema({
    User:{
        type:mongoose.Schema.Types.ObjectId, ref:"User",
        required:true
    },
    Date:{
        type:String
    },
    Exercises:[{
        name:String,
        sets:Number,
        reps:Number,    
    }]
})

export const WorkoutModel = mongoose.model("GymRecord",GymRecordSchema)