import express from 'express';
// import blogsModel from "../blogs_Schema.js";
import { blogPost, blogGetAll, blogUpdate, blogDelete, blogGetOne } from "..//Controllers_Blog/blogs_functions.js"
import { verifyToken, userRole } from '../../Usersfolder/middlewares_users/users_functions.js';
import BlogValidator from "../middlewares_blogs/blogs_validator.js"
const blogrouter = express.Router();


//CREATE A BLOG LIST
blogrouter.post("/createBlog", verifyToken, BlogValidator, blogPost)
// blogrouter.post("/createBlog",createImage)
// blogrouter.post("/createBlog", image)
blogrouter.get("/getAllblogs", blogGetAll);
blogrouter.get("/getOneblog/:id", blogGetOne);
blogrouter.put("/updateblog/:id", verifyToken, userRole, blogUpdate);
blogrouter.delete("/deleteblog/:id", verifyToken, userRole, blogDelete);






export default blogrouter;





