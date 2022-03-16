import express from 'express';
import commentPost from "../comment_functions/comment_function.js"
const commentrouter = express.Router();


//CREATE comments
commentrouter.post("/getOneblog/:id/comments",commentPost)


export {commentrouter as default}