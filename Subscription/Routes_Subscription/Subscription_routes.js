import express from 'express';

// import {subscriptionPost} from "../Controllers_Subscription/subscription_functions.js"
import {subscriptionPost, subscriptionGetAll, subscriptionUpdate, subscriptionDelete, subscriptionGetOne} from "../Controllers_subscription/Subscription_functions.js"
import { verifyToken } from '../../Usersfolder/middlewares_users/users_functions.js';
import Subscription_validator from '../middlewares_contacts/Subscription_validator.js';
const subscriptionrouter = express.Router();


subscriptionrouter.post("/createsubscription", Subscription_validator, subscriptionPost)
subscriptionrouter.get("/getAllsubscriptions", verifyToken,subscriptionGetAll);
subscriptionrouter.get("/getOnesubscription/:id", verifyToken,subscriptionGetOne);
subscriptionrouter.put("/updatesubscription/:id", verifyToken,subscriptionUpdate);
subscriptionrouter.delete("/deletesubscription/:id", verifyToken,subscriptionDelete);






export default subscriptionrouter;





