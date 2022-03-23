import 'dotenv/config';

import express from "express";
import jwt from "jsonwebtoken";

const app=express();
app.use(express.json())

const posts=[
    {
        username: "kyle",
        post: "post 1"
    },
    { 
        username: "jim",
        post: "post 2"
    }
]

app.get("/posts", authenticateToken,(req, res)=>{
    res.json(posts.filter(post=> post.username===req.user.name))
})


function authenticateToken(req,res, next){
    const authHeader=req.headers["authorization"];
    const token= authHeader && authHeader.split(" ")[1];
    if (token==null) return res.sendStatus (401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
        if (err) return res.sendStatus(403);
        req.user=user;
        next();
    })

}

app.post("/login", (req,res)=>{
    const username=req.body.username;
    const user= {name: username};
    jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, (err,token)=>{
        if(err) throw err;
        res.send(token)

    })
})

app.listen(2000, ()=>{
    console.log('Server is running on port 2000');
})