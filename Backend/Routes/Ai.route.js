import express from "express"
import { AddPrompt } from "../Controller/AI.controller.js";

export const AIRouter = express.Router();

AIRouter.post("/addprompt",AddPrompt)