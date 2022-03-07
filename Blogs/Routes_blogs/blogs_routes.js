import express from 'express';
// import blogsModel from "../blogs_Schema.js";
import {blogPost, blogGetAll, blogUpdate, blogDelete, blogGetOne} from "..//Controllers_Blog/blogs_functions.js"
// import {blogPost, blogGetAll, blogGetOne, blogUpdate} from "../middlewares/blogs_functions.js"
const blogrouter = express.Router();


//CREATE A BLOG LIST
blogrouter.post("/createBlog", blogPost)
blogrouter.get("/getAllblogs", blogGetAll);
blogrouter.get("/getOneblog/:id", blogGetOne);
blogrouter.put("/updateblog/:id", blogUpdate);
blogrouter.delete("/deleteblog/:id", blogDelete);






export default blogrouter;





