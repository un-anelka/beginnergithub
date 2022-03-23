import contactsModel from '../contacts_Schema.js';

// const contacts = contactsModel.find();
// // console.log(contacts)
const contactValidator = async(req, res, next) => {
    const contacts= await contactsModel.find();
    // console.log(contacts);

    //validating contact emails
    let {name, email, message} = req.body
    if(!name) return res.json({error: 'email missing'});
    if(!email) return res.json({error: 'email missing'});
    if(!message) return res.json({error: 'message missing'});
    
    next();
  }


  export {contactValidator as default}