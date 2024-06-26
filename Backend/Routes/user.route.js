import express from "express"
import { Login, Signup, deleteUser, getUser, updateUser } from "../Controller/user.controller.js";

export const UserRouter = express.Router();
UserRouter.post("/signup",Signup);
UserRouter.post("/login",Login);
UserRouter.get("/profile/:id",getUser)
UserRouter.delete("/deleteuser",deleteUser)
UserRouter.put("/updateuser",updateUser)