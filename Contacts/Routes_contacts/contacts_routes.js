import express from 'express';
// import contactsModel from "../contacts_Schema.js";
import { contactDelete, contactGetAll, contactGetOne, contactPost, contactUpdate} from "../Controllers_contacts/contacts_functions.js";
import { verifyToken, userRole } from '../../Usersfolder/middlewares_users/users_functions.js';
import contactValidator from "../middlewares_contacts/contacts_validator.js"
const contactrouter = express.Router();


//CREATE A contact LIST
contactrouter.post("/createcontact",contactValidator,contactPost)
contactrouter.get("/getAllcontacts",verifyToken, contactGetAll);
contactrouter.get("/getOnecontact/:id", verifyToken,userRole, contactGetOne);
contactrouter.put("/updatecontact/:id", verifyToken,userRole,contactUpdate);
contactrouter.delete("/deletecontact/:id", verifyToken,userRole, contactDelete);






export default contactrouter;





