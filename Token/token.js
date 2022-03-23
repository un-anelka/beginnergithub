import express from "express";
import jwt from "jsonwebtoken";

const app=express();

app.get("/api", (req, res)=>{
    res.json({
        message: "Welcome to the API"
    })
})

app.post("/api/posts", verifyToken,(req,res)=>{

    jwt.verify(req.token, "secretkey", (err, authData)=>{
        if (err){
            res.sendStatus(403)
        }else{
            res.json({
                 message: "Post created",
                 authData
            })
        }
    })

})

app.post("/api/login", (req,res)=>{

    const users={
        id:"1",
        username:"brad",
        email: "brad@gmail.com",
        password: "password"
    }

    jwt.sign(users, "secretkey",{expiresIn: "30s"}, (err, token)=>{
        if (err) throw err;
        res.json({
            message: "Token generated",
            token
        })
    })
})

// FORMAT OF TOKEN
//Authorization: bearer <access_token>

//Verify token function

function verifyToken(req,res,next){
    //Get auth header value
    const bearerHeader=req.headers["authorization"];
    console.log(bearerHeader);
    //check if the bearer is undefined

    if (typeof bearerHeader!=="undefined"){
        //Split by space
        const bearer=bearerHeader.split(" ");
        //Get token from the array
        const bearerToken=bearer[1];

        //set token
        req.token=bearerToken;

        next();

    } else{
        res.sendStatus(403);
    }
}

app.listen(5000, ()=>{
    console.log('Server is running on port 5000');
})