import contactsModel from "../contacts_Schema.js";

const contactPost= async(req, res) => {
    try {
        const contacts = await contactsModel.create({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message,
            date: Date.now()
        })
        res.status(201).json({
            message: "contact has been created successfully",
            data: contacts
        })
    } catch (error) {
        console.log(error)
    }; 
}
const contactGetAll= async(req, res) => {
    try {
        const contacts = await contactsModel.find().sort({
            date:"-1"
        });
        
        res.status(200).json({
            message: "Todos are fetched successfully",
            data: contacts
        })
        
    } catch (error) {
        console.log(error)
    };
}
const contactGetOne= async(req, res) => {
    try {
        const id=req.params.id;
        const contactId = await contactsModel.findById(id)
        
        res.status(200).json({
            message: `contact with the ID:${id} is fetched successfully`,
            data:  contactId
        })
    } catch (error) {
        console.log(error)
    };
}
const contactUpdate= async(req, res) => {
    try {
        const id=req.params.id;
        const contactId = await contactsModel.findByIdAndUpdate(id);
        // const contactupdate= req.body
        
        const contactupdate = await contactsModel.findByIdAndUpdate(id,{
            ...req.body
        })
        // Object.assign(contactId, contactupdate)

        res.status(200).json({
            message: `contact with the ID:${id} is updated successfully`,
            data: contactId
        })
    } catch (error) {
        console.log(error)
    };
}
const contactDelete= async(req, res) => {
    try {
        const id=req.params.id;
        const contactId = await contactsModel.findByIdAndDelete(id)
        
        res.status(200).json({
            message: `contact with the ID:${id} was deleted successfully`,
            // data: contactId
        })
    } catch (error) {
        console.log(error)
    };
}



export {contactPost, contactGetAll, contactUpdate, contactDelete, contactGetOne} 
