import express from 'express';
// import blogsModel from "../blogs_Schema.js";
import {blogPost, blogGetAll, blogUpdate, blogDelete, blogGetOne, blogDuplicate} from "..//Controllers_Blog/blogs_functions.js"
import { verifyToken, userRole } from '../../middlewares/users_functions.js';
const blogrouter = express.Router();


//CREATE A BLOG LIST
blogrouter.post("/createBlog", verifyToken,blogDuplicate,blogPost)
blogrouter.get("/getAllblogs",blogGetAll);
blogrouter.get("/getOneblog/:id", verifyToken,userRole, blogGetOne);
blogrouter.put("/updateblog/:id", verifyToken,userRole, blogUpdate);
blogrouter.delete("/deleteblog/:id", verifyToken,userRole, blogDelete);






export default blogrouter;





