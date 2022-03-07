import subscriptionsModel from "../Subscription_Schema.js";

const subscriptionPost= async(req, res) => {
    try {
        const subscriptions = await subscriptionsModel.create({
            email: req.body.email,
            date: Date.now()
        })
        res.status(201).json({
            message: "subscription has been created successfully",
            data: subscriptions
        })
    } catch (error) {
        console.log(error)
    }; 
}
const subscriptionGetAll= async(req, res) => {
    try {
        const subscriptions = await subscriptionsModel.find().sort({
            date:"-1"
        });
        
        res.status(200).json({
            message: "Todos are fetched successfully",
            data: subscriptions
        })
        
    } catch (error) {
        console.log(error)
    };
}
const subscriptionGetOne= async(req, res) => {
    try {
        const id=req.params.id;
        const subscriptionId = await subscriptionsModel.findById(id)
        
        res.status(200).json({
            message: `subscription with the ID:${id} is fetched successfully`,
            data:  subscriptionId
        })
    } catch (error) {
        console.log(error)
    };
}
const subscriptionUpdate= async(req, res) => {
    try {
        const id=req.params.id;
        const subscriptionId = await subscriptionsModel.findByIdAndUpdate(id);
        // const subscriptionupdate= req.body
        
        const subscriptionupdate = await subscriptionsModel.findByIdAndUpdate(id,{
            ...req.body
        })
        // Object.assign(subscriptionId, subscriptionupdate)

        res.status(200).json({
            message: `subscription with the ID:${id} is updated successfully`,
            data: subscriptionId
        })
    } catch (error) {
        console.log(error)
    };
}
const subscriptionDelete= async(req, res) => {
    try {
        const id=req.params.id;
        const subscriptionId = await subscriptionsModel.findByIdAndDelete(id)
        
        res.status(200).json({
            message: `subscription with the ID:${id} was deleted successfully`,
            // data: subscriptionId
        })
    } catch (error) {
        console.log(error)
    };
}



export {subscriptionPost, subscriptionGetAll, subscriptionUpdate, subscriptionDelete, subscriptionGetOne} 
