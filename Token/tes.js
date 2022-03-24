import express from "express";
import bcrypt from "bcrypt";

let app = express();
app.use(express.json())

app.listen(3000, () => {
    console.log("Server running on port 3000");
    const users = [];

    app.get("/users", (req, res) => {
        res.json(users)
    })

    app.post("/users", async (req, res) => {
        try {
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            const user = {
                name: req.body.name,
                password: hashedPassword
            }
            // console.log(salt)
            users.push(user);
            res.status(201).send(users)
        } catch (error) {
            console.log(error);
            res.status(500).send();
        }

    })

    app.post("/users/login", async (req, res) => {
        const user = users.find(user => user.name === req.body.name)
        console.log(user)

        if (user == null) return res.status(400).send("cannot find user");
        try {

            if (await bcrypt.compare(req.body.password, user.password)) {
                res.send("Success");
            }
            else {
                res.send("Not allowed");
            }

        } catch (error) {
            console.log(error)
        }


    })

});
