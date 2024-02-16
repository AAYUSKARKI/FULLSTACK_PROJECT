import dotenv from "dotenv";
import connectdb from "./db/index.js";
import { app } from "./app.js";
dotenv.config({path : './env'})
connectdb()
.then(()=>{
  app.listen(process.env.PORT||5000,()=>{
    console.log(`server is running at port: ${process.env.PORT}`)
  })
})
.catch((err)=>{
  console.log("mongodb connection failed",err);
})


















/*
import express from "express"
const app = express()
(async ()=>{
    try {
      await  mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
      app.on("error",(error)=>{
        console.log("error:",error);
        throw error;
      })
      app.listen(process.env.PORT,()=>{
        console.log(`App is listening on port${process.env.PORT}`);
      })
    } catch (error) {
        console.error("ERROR",error);
        throw error;
    }
})()*/