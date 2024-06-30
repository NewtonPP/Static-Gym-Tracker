import express from "express"
import { AddDay, GetDays } from "../Controller/journal.controller.js";

export const JournalRouter = express.Router();

JournalRouter.post("/addday",AddDay)
JournalRouter.get("/getdays",GetDays)