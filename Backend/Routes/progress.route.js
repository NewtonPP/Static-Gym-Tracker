import express from "express"
import { AddProgress, GetProgress } from "../Controller/progress.controller.js";

export const ProgressRoute = express.Router();

ProgressRoute.post("/addprogress",AddProgress)
ProgressRoute.get("/getprogress/:id",GetProgress)