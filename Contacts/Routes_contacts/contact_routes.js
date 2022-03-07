import express from 'express';

import {contactPost, contactGetAll, contactUpdate, contactDelete, contactGetOne} from "../Controllers_Contact/contact_functions.js"

const contactrouter = express.Router();


contactrouter.post("/createcontact", contactPost)
contactrouter.get("/getAllcontacts", contactGetAll);
contactrouter.get("/getOnecontact/:id", contactGetOne);
contactrouter.put("/updatecontact/:id", contactUpdate);
contactrouter.delete("/deletecontact/:id", contactDelete);






export default contactrouter;





