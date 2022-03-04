import mongoose from 'mongoose';
const { Schema } = mongoose;

const todosSchema = new Schema({
    title: String, 
    author: String,
    date: { type: Date, default: Date.now }
});


export default new mongoose.model('todoSchema', todosSchema);


