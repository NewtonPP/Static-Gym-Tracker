import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyCPxLhO0EySjq2QEINp7X0w_wI95HNVHMg")
console.log(genAI)
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

export async function run(prompt) {
   
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text
  }
  
