import mongoose from 'mongoose';
const { Schema } = mongoose;

const subscriptionSchema = new Schema({
    email: String,
    date: { type: Date, default: Date.now }
});


export default new mongoose.model('subscriptionsModel', subscriptionSchema);