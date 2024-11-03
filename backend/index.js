import express from "express"
import dotenv from "dotenv"
import connectDb from "./config/Db.js"

dotenv.config()

const app = express()
connectDb()


app.listen(process.env.PORT, ()=>{
    console.log(`Server listening on ${process.env.PORT}`);
    
})