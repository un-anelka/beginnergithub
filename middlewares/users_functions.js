import bcrypt from "bcrypt"
import usersModel from "../users_Schema.js";

const userPost= async(req, res) => {
    try {
        let salt= await bcrypt.genSalt();
        let hashedPassword= await bcrypt.hash(req.body.password, salt);
        const users = await usersModel.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: hashedPassword,
            date: Date.now()
        })

        res.status(201).json({
            message: "User has been created successfully",
            data: users
        })
    } catch (error) {
        console.log(error)
    }; 
}
const userGetAll= async(req, res) => {
    try {
        const users = await usersModel.find().sort({
            date:"-1"
        });
        
        res.status(200).json({
            message: "Todos are fetched successfully",
            data: users
        })
        
    } catch (error) {
        console.log(error)
    };
}
const userGetOne= async(req, res) => {
    try {
        const id=req.params.id;
        const userId = await usersModel.findById(id)
        
        res.status(200).json({
            message: `User with the ID:${id} is fetched successfully`,
            data:  userId
        })
    } catch (error) {
        console.log(error)
    };
}
const userUpdate= async(req, res) => {
    try {
        const id=req.params.id;
        const userId = await usersModel.findByIdAndUpdate(id);
        // const userupdate= req.body
        
        const userupdate = await usersModel.findByIdAndUpdate(id,{
            ...req.body
        })
        // Object.assign(userId, userupdate)

        res.status(200).json({
            message: `User with the ID:${id} is updated successfully`,
            data: userId
        })
    } catch (error) {
        console.log(error)
    };
}
const userDelete= async(req, res) => {
    try {
        const id=req.params.id;
        const userId = await usersModel.findByIdAndDelete(id)
        
        res.status(200).json({
            message: `User with the ID:${id} was deleted successfully`,
            // data: userId
        })
    } catch (error) {
        console.log(error)
    };
}



export {userPost, userGetAll, userUpdate, userDelete, userGetOne} 
// export {userPost, userGetAll, userGetOne, userUpdate, } 