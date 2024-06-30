//import packages
import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import path from "path"
import { fileURLToPath } from 'url';
//import modules
import { UserRouter } from "./Routes/user.route.js"
import { WorkoutRouter } from "./Routes/gymrecord.route.js"
import { MealRouter } from "./Routes/calorie.route.js"
import { ConnectToDB } from "./Utils/ConnectToDB.js"
import { ExercisesRouter } from "./Routes/exercises.route.js"
import { ProgressRoute } from "./Routes/progress.route.js";
import { JournalRouter } from "./Routes/journal.route.js";

dotenv.config();
// __dirname and __filename are not available in ES modules, so we need to define them.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
app.use(express.json())
app.use(cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use("/api/user",UserRouter)
app.use("/api/workout", WorkoutRouter)
app.use("/api/meal",MealRouter)
app.use("/api/exercises",ExercisesRouter)
app.use("/api/progress",ProgressRoute)
app.use("/api/journal",JournalRouter)
app.use('/public', express.static(path.join(__dirname, '../public')));

const PORT = 3000 || 5000
// const PORT = process.env.PORT;
app.listen(PORT, (req,res)=>{
    ConnectToDB();
    console.log(`Server started at PORT ${PORT}`)

})
