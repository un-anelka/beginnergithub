import express from 'express';
import usersModel from "../users_Schema.js";
import {userPost, userGetAll, userUpdate, userDelete, userGetOne} from "../middlewares/users_functions.js"
// import {userPost, userGetAll, userGetOne, userUpdate} from "../middlewares/users_functions.js"
const userrouter = express.Router();


//CREATE A TODO LIST
userrouter.post("/", userPost)
userrouter.get("/getAllUsers", userGetAll);
userrouter.get("/getOneUser/:id", userGetOne);
userrouter.put("/updateUser/:id", userUpdate);
userrouter.delete("/deleteUser/:id", userDelete);






export default userrouter;





