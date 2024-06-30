import jwt from "jsonwebtoken"

export const GenerateRefreshToken = (id)=>{
    const JWT_SECRET = "ThisIsMySecretKey12098"
    return jwt.sign({id},JWT_SECRET,{expiresIn:"3d"})
}