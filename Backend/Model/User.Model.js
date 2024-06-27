import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    FullName:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true,
        unique:true
    },
    Contact:{
        type:Number,
        required:true
    },
    Password:{
        type:String,
        required:true
    },
    Weight:{
        type:Number
    },
    Height:{
        type:String
    },
    Gender:{
        type:String,
        required:true,
        enum:["Male","Female"]
    },
    DateOfBirth:{
        type:Date,
        required:true
    },
    Age:{
        type:Number,
        required:true
    },
    GymRecords:[{type:mongoose.Schema.Types.ObjectId, ref:"GymRecord"}],   
    CalorieRecords:[{type:mongoose.Schema.Types.ObjectId,ref:"CalorieRecord"}],
    UserType:{
        type:String,
        required:true,
        default:"USER",
        enum:["USER","ADMIN"],
    }

})

export const UserModel = mongoose.model ("GymUser",UserSchema)