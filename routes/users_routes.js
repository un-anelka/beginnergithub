import express from 'express';
import usersModel from "../users_Schema.js";
import {userPost, userGetAll, userUpdate, userDelete, userGetOne} from "../middlewares/users_functions.js"
// import {userPost, userGetAll, userGetOne, userUpdate} from "../middlewares/users_functions.js"
const router = express.Router();


//CREATE A TODO LIST
router.post("/", userPost)
router.get("/getAllUsers", userGetAll);
router.get("/getOneUser/:id", userGetOne);
router.put("/updateUser/:id", userUpdate);
router.delete("/deleteUser/:id", userDelete);






export default router;





