import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import 'dotenv/config';
import userrouter from "./Usersfolder/User_routes/users_routes.js";
import blogrouter from "./Blogs/Routes_blogs/blogs_routes.js";
import contactrouter from './Contacts/Routes_contacts/contacts_routes.js'
import subscriptionrouter from "./Subscription/Routes_Subscription/Subscription_routes.js";
import commentsrouter from "./Comment/Comments_routes/comments_routes.js"

const app = express();

app.set("view engine", "ejs");


app.use(express.json());



const { DATABASE_DEV, DATABASE_TEST, NODE_ENV } = process.env;
// const connectDb = () => {
//     mongoose
//         .connect(NODE_ENV === 'test' ? MONGO_URL_TEST : MONGO_URL)
//         .then(console.log('connected to database'));
// };



const Port = process.env.PORT || 4500;


// app.listen(Port, async () => {
//     console.log(`Connected to server on ${Port} port`);
//     await mongoose.connect(process.env.DATABASE_TEST)
//     try {
//         console.log(`Connected to database`);

//     } catch (error) {
//         console.log(`Error: ${err}`)
//     }
//     app.use(cors({
//         origin: "*",
//         origin: "http://127.0.0.1:5501"
//     }))
//     app.use(userrouter);
//     app.use(blogrouter);
//     app.use(contactrouter);
//     app.use(subscriptionrouter);
//     app.use(commentsrouter);
// })
app.listen(Port, async () => {
    console.log(`Connected to server on ${Port} port`);
    await mongoose.connect(NODE_ENV === 'test' ? DATABASE_TEST : DATABASE_DEV)
    try {
        console.log(`Connected to database`);

    } catch (error) {
        console.log(`Error: ${err}`)
    }
    app.use(cors({
        origin: "*",
        origin: "http://127.0.0.1:5501"
    }))
    app.use(userrouter);
    app.use(blogrouter);
    app.use(contactrouter);
    app.use(subscriptionrouter);
    app.use(commentsrouter);
})




// import * as  fs from "fs";

// console.log(fs.readFile())

// // UPLOADING IMAGES  
// import multer from "multer";
// import path from "path";
// const storage=multer.diskStorage({
//     destination: (req, file, cb)=>{
//         cb(null, "Images") // null can be replaced by error handling and Images by any reference folder
//     },
//     filename: (req, file, cb)=>{
//         console.log(file);
//         cb(null, Date.now()+ path.extname(file.originalname))
//     }
// })


// const upload=multer({storage: storage})

// app.get("/upload", (req,res)=>{
//     // res.send("upload");
//     res.render("index");

// })

// app.post("/upload", upload.single("image"), (req, res)=>{
//     res.send("Image uploaded");
// })


export default app