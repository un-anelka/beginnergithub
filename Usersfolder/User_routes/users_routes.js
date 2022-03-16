import express from 'express';
// import usersModel from "../users_Schema.js";
import {userPost, userGetAll, userUpdate, userDelete, userGetOne, userlogin, verifyToken, userRole} from "../middlewares_users/users_functions.js"
import signupValidator from "../controllers_users/users_validator.js"
const userrouter = express.Router();


//CREATE USERS
userrouter.post("/", signupValidator,userPost)
userrouter.get("/getAllUsers",verifyToken, userRole, userGetAll);
userrouter.get("/getOneUser/:id", verifyToken,userRole, userGetOne);
userrouter.put("/updateUser/:id",verifyToken, userRole,userUpdate);
userrouter.delete("/deleteUser/:id", verifyToken,userRole,userDelete);
userrouter.post("/login",userlogin)








export default userrouter;





