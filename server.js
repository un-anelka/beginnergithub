import express from "express";
import mongoose from "mongoose";
import 'dotenv/config';
import userrouter from "./routes/users_routes.js";
import blogrouter from "./Blogs/Routes_blogs/blogs_routes.js";
import contactrouter from "./Contacts/Routes_contacts/contact_routes.js";
import subscriptionrouter from "./Subscription/Routes_Subscription/Subscription_routes.js";


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
    }
    app.use(userrouter)
    app.use(blogrouter)
    app.use(contactrouter)
    app.use(subscriptionrouter)
})


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