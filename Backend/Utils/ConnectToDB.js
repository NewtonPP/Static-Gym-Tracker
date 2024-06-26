import mongoose from "mongoose";

export const ConnectToDB = ()=>{
     mongoose.connect("mongodb://localhost:27017/GymDatabase")
    const db = mongoose.connection;
    
    db.on("connected",()=>{
        console.log("Successfully connected to database")
    })
    db.on('open', () => console.log('open'))
    db.on("disconnected",()=>{
        console.log("Disconnected from the database")
    })
    db.on("error",()=>{
        console.log(error)
    })
}