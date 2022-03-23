import express from 'express';
import comments_validators from '../comments_middleware/comments_validators.js';
import commentPost from "../comment_functions/comment_function.js"
const commentrouter = express.Router();


//CREATE comments
commentrouter.post("/getOneblog/:id/comments", comments_validators, commentPost)


export {commentrouter as default}