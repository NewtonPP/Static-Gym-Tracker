import jwt from "jsonwebtoken"
import { UserModel } from "../Model/User.Model.js";


export const AuthMiddleWare = async(req,res,next)=>{
    const JWT_SECRET = "ThisIsMySecretKey12098"
    let Token
    if(req.headers?.authorization?.startsWith("Bearer")){
        Token = req.headers.authorization.split(" ")[1];
    }
    try {
        if(!Token){
            return res.status(400).json({
                message:"No token found: Unauthorized"
            })
        }
    
        const Decoded = jwt.verify(Token,JWT_SECRET,async(err,decoded)=>{
            if(err){
                return res.status(401).send({
                    message: "Unauthorized"
                })
            }
            const user = await UserModel.findOne({Email:decoded.Email})
            if(!user){
                return res.status(400).send({
                    message: "Unauthorized: The user for the token does not exist"
                })
            }
            req.user = user
            next();
        })
        
    } catch (error) {
        console.log("Error in the Middleware function",error)
    }
}