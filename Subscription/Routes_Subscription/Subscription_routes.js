import express from 'express';

// import {subscriptionPost} from "../Controllers_Subscription/subscription_functions.js"
import {subscriptionPost, subscriptionGetAll, subscriptionUpdate, subscriptionDelete, subscriptionGetOne} from "../Controllers_subscription/Subscription_functions.js"

const subscriptionrouter = express.Router();


subscriptionrouter.post("/createsubscription", subscriptionPost)
subscriptionrouter.get("/getAllsubscriptions", subscriptionGetAll);
subscriptionrouter.get("/getOnesubscription/:id", subscriptionGetOne);
subscriptionrouter.put("/updatesubscription/:id", subscriptionUpdate);
subscriptionrouter.delete("/deletesubscription/:id", subscriptionDelete);






export default subscriptionrouter;





