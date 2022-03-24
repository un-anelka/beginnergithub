import mongoose from "mongoose"
import request from "supertest"
import app from "./../server.js"
import 'dotenv/config';



beforeEach(async () => {
    await mongoose.connect(process.env.DatabaseURI).then(() => console.log("connected successfully to Database!!"))
}, 9000)

test("should get all blogs", async () => {

    let blogs;
    blogs = await request(app).get("/getAllblogs").expect(200)
    console.log(blogs)
})


// CREATING BLOG
test("should create a blog", async () => {
    const blog = {
        auth: "RUDASINGWA",
        title: "Software Development",
        image: "image url test",
        content: "hello world of programming"
    }

    const result = await request(app).post("/createBlog").send(blog).expect(200)
    console.log(result)

})

test("should return error", async () => {
    const blog = {
        auth: "RUDASINGWA",
        title: "",
        image: "image url test",
        content: "hello world of programming"
    }

    const result = await request(app).post("/createBlog").send(blog).expect({ error: 'title missing' })
    console.log(result)

})


