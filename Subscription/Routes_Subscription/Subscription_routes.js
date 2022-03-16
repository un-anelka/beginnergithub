import express from 'express';

// import {subscriptionPost} from "../Controllers_Subscription/subscription_functions.js"
import {subscriptionPost, subscriptionGetAll, subscriptionUpdate, subscriptionDelete, subscriptionGetOne, subscriptionDuplicate} from "../Controllers_subscription/Subscription_functions.js"
import { verifyToken } from '../../Usersfolder/middlewares_users/users_functions.js';
const subscriptionrouter = express.Router();


subscriptionrouter.post("/createsubscription", subscriptionDuplicate, subscriptionPost)
subscriptionrouter.get("/getAllsubscriptions", verifyToken,subscriptionGetAll);
subscriptionrouter.get("/getOnesubscription/:id", verifyToken,subscriptionGetOne);
subscriptionrouter.put("/updatesubscription/:id", verifyToken,subscriptionUpdate);
subscriptionrouter.delete("/deletesubscription/:id", verifyToken,subscriptionDelete);






export default subscriptionrouter;





