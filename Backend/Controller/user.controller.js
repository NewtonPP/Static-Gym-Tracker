import { UserModel } from "../Model/User.Model.js";
import bcrypt from "bcryptjs"
export const Signup = async(req,res)=>{
    try {
        const {FullName,Email,Contact,Password,ConfirmPassword,Weight,Height,Gender,DateOfBirth,UserType} = req.body
        if(!FullName || !Email || !Contact || !DateOfBirth || !Gender || !Height ||!Weight
            || !Password || !ConfirmPassword
        ){
            return res.status(400).json({message:"You need to enter all the credentials"})
        }
        const ifUser = await UserModel.findOne({Email})
        if(ifUser){
            return res.status(400).json({message:"This User already exists"})
        }
        if(Password !== ConfirmPassword){
            return res.status(400).json({message:"Your passwords do not match"})
        }
        const Salt = await bcrypt.genSalt(10);
        const HashedPassword = await bcrypt.hash(Password,Salt);
        
     
        const Today = new Date();
        const DOB = new Date(DateOfBirth)
        let YearDifference = Today.getFullYear() - DOB.getFullYear();
        let MonthDifference = DOB.getMonth()-Today.getMonth();
        let Age;
        if(MonthDifference>0 || Today.getDate()<DOB.getDate()){
            Age = YearDifference-1
        }else{
            Age = YearDifference
        }

        const newUser = new UserModel({
            FullName,
            Email,
            Contact,
            Password:HashedPassword,
            Weight, 
            Height,
            Gender,
            DateOfBirth,
            Age,
            UserType
        })
        if(newUser){
            newUser.save();
            res.status(200).json(newUser)
        }
    } catch (error) {
        res.status(500).json({error:"Internal Server Error"})
        console.log("Error in the Signup Controller",error)
    }
}

export const Login = async (req,res)=>{
    try {
        const {Email, Password} = req.body;
        const ifUser = await UserModel.findOne({Email});
       if(!ifUser){return res.status(400).json({message:"No account found with this email address"})}
        const isPasswordValid = await bcrypt.compare(Password,ifUser.Password)
        if(!isPasswordValid){
           return res.status(400).json({message:"Invalid Password"})
        }
        res.status(200).json(ifUser)
    
    } catch (error) {
        res.status(500).json({error:"Internal Server Error"})
        console.log("Error in the Login Controller",error)
    }
}

export const getUser =async(req,res)=>{
    try {
        const {id} = req.params;
        const User = await UserModel.findById(id)
        if(!User){
            return res.status(400).json({message:"No User Found"})
        }
        return res.status(200).json(User)
    } catch (error) {
        res.status(500).json({error:"Internal Server Error"})
        console.log("Error in the getUser Controller",error)
    }
}


export const deleteUser=async(req,res)=>{
    try {
        const {Email} = req.body;
        const User = await UserModel.findOneAndDelete({Email})
        return res.status(200).json(User)
    } catch (error) {
        res.status(500).json({error:"Internal Server Error"})
        console.log("Error in the deleteUser Controller",error)
    }
}

export const updateUser=async(req,res)=>{
    try {
        const {Email} = req.body;
        const Data = req.body;
        const User = await UserModel.findOneAndUpdate({Email},Data,{new:true})
        return res.status(200).json(User)
    } catch (error) {
        res.status(500).json({error:"Internal Server Error"})
        console.log("Error in the updateUser Controller",error)
    }
}