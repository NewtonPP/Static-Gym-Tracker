import express from "express"
import { ChangeEmail, Login, Signup, deleteUser, getUser, updateUser } from "../Controller/user.controller.js";
import { AuthMiddleWare } from "../Middlewares/User.middleware.js";

export const UserRouter = express.Router();
UserRouter.post("/signup",Signup);
UserRouter.post("/login",Login);
UserRouter.get("/profile/:id",getUser)
UserRouter.delete("/deleteuser",deleteUser)
UserRouter.put("/updateuser/:id",AuthMiddleWare,updateUser)
UserRouter.put("/changeemail",ChangeEmail)