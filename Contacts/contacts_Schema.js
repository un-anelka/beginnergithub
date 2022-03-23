import mongoose from 'mongoose';
const { Schema } = mongoose;

const contactSchema = new Schema({
    name:String,
    email: String, 
    message: String
});


export default new mongoose.model('contactsModel', contactSchema);