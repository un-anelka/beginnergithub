import express from "express";
import mongoose from "mongoose";
import 'dotenv/config';
import router from "./routes/users_routes.js";



const app = express();

app.set("view engine", "ejs");

app.use(express.json());


const Port = process.env.PORT;

app.listen(Port, async () => {
    console.log(`Connected to server on ${Port} port`);
    await mongoose.connect(process.env.DatabaseURI)
    try {
        console.log(`Connected to database`);
       
    } catch (error) {
        console.log(`Error: ${err}`)
    } await app.use(router)
})

