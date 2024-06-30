import { run } from "../Utils/GenAI.js";

export const AddPrompt = async(req,res)=>{
try {
    const {Prompt} = req.body;
    const answer = await run(Prompt)
    if(answer){
        res.status(200).json({answer:answer})
    }
} catch (error) {
    res.status(500).json({error:"Internal Server Error"})
    console.log("Error in the AI Controller",error)
}
}