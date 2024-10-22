import express from 'express';
import dotenv from 'dotenv'; 
import  { GoogleGenerativeAI } from '@google/generative-ai';
import cors from 'cors'

const app = express();

app.use(cors());
app.use(express.json())
dotenv.config();

app.post('/completion',async (req,res)=>{
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const {prompt} = req.body;
    //const prompt = "Write a short paragraph on mars";
    

    const result = await model.generateContent(prompt);
    return res.json({
        result
    })
    
})


app.listen(3000, () => {
    console.log(`Server is running at http://localhost:3000`);
});