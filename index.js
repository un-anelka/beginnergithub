import express from "express";
import mongoose from "mongoose";
import todosModel from "./Schema.js";


const app = express();
app.use(express.json())
const Port = 4000;

app.listen(Port, () => {
    console.log(`Connected to server on ${Port} port`);
    mongoose.connect("mongodb+srv://unrudasingwa:123qwe@node-postman.tup09.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
        .then(() =>
            console.log("connected to DB"))
        .catch((err) => {
            console.log(`Error: ${err}`)
        });
})

app.get("/", (req, res) => {
    res.send("Hello UN");

})


//CREATE A TODO LIST

app.post("/", async (req, res) => {
    try {
        const result = await todosModel.create({
            title: req.body.title,
            author: req.body.author,
            date: Date.now()
        })
        
        res.status(201).json({
            message: "Todo item created successfully",
            data: result
        })
    } catch (error) {
        console.log(error)
    };
})

//GET ALL TODOS
app.get("/getAllTodos", async (req, res) => {
    try {
        const todos = await todosModel.find().sort({
            date:"-1"
        });
        
        res.status(200).json({
            message: "Todos are fetched successfully",
            data: todos
        })
    } catch (error) {
        console.log(error)
    };
})

//GET SINGLE TODO
app.get("/getOneTodo/:id", async (req, res) => {
    try {
        const id=req.params.id;
        const todoId = await todosModel.findById(id)
        
        res.status(200).json({
            message: `Todo with the ID:${id} is fetched successfully`,
            data: todoId
        })
    } catch (error) {
        console.log(error)
    };
})

//UPDATE TODO
app.patch("/update/:id", async (req, res) => {
    try {
        const id=req.params.id;
        const todoupdate = await todosModel.findByIdAndUpdate(id,{
            ...req.body
        })
        
        res.status(200).json({
            message: `Todo with the ID:${id} is updated successfully`,
            data: todoupdate
        })
    } catch (error) {
        console.log(error)
    };
})
app.patch("/update/:id", async (req, res) => {
    try {
        const id=req.params.id;
        const todoupdate = await todosModel.findByIdAndUpdate(id,{
            ...req.body
        })
        
        res.status(200).json({
            message: `Todo with the ID:${id} is updated successfully`,
            data: todoupdate
        })
    } catch (error) {
        console.log(error)
    };
})

//DELETE TODO
app.delete("/delete/:id", async (req, res) => {
    try {
        const id=req.params.id;
        const tododelete = await todosModel.findByIdAndDelete(id)
        console.log("hello")
        res.status(200).json({
            message: `Todo with the ID:${id} was deleted successfully`
        })
    } catch (error) {
        console.log(error)
    };
})