import express from "express";


const app =express();


const users=[];
app.post("/users", (req,res)=>{
    const user={
        name: "UN",
        email:"peace"
    }

    users.push(user);
    res.json("User created")
}

)

app.listen(3000,()=>console.log("Server is running UN"))

export {app as default}