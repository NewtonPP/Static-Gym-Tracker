import mongoose from "mongoose"

const ProgressSchema = mongoose.Schema({
    User:{type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    // Goal:{
    //     type:String,
    //     enum:["Weight Loss","Weight Gain","Muscle Gain"],
    //     required:true
    // },
    Date:{
        type:Date,
        required:true
    },
    Weight:{
        type:Number,
        required:true
    },
    BodyFat:{
        type:Number,
        required:true
    },

})

export const ProgressModel = mongoose.model("Progress",ProgressSchema)
