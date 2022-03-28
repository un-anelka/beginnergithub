import mongoose from "mongoose"
import request from "supertest"
import app from "./../server.js"
import 'dotenv/config';
import usersModel from "../Usersfolder/users_Schema.js";
import blogsModel from "../Blogs/blogs_Schema.js";
// for decoding the token and easily extracting the id from the payload
import jwt from "jsonwebtoken";
// for hashing the password successfully when we create users


// our global object for storing auth information
let auth = {};


//CONNECTING TO MONGODB

// beforeEach(async () => {
//     await mongoose.connect(process.env.DatabaseURI).then(() => console.log("connected successfully to Database one!!!!"))
// }, 9000)

const blog1 = {
    auth: "RUDASINGWA",
    title: "Software Development 123",
    image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Ftoppng.com%2Fweb-development-icon-png-clipart-website-development-web-dev-icon-PNG-free-PNG-Images_182941&psig=AOvVaw0REaDqkPIYpsHXHmge36ih&ust=1648364380657000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCNCO5P2Z4_YCFQAAAAAdAAAAABAD",
    content: "hello world of programming"
}
const user1 = {
    email: "abakunda@gmail.com",
    password: "123qwe",
    firstname: "abakunda",
    lastname: "UN"
}

beforeAll(async () => {
    await mongoose.connect(process.env.DATABASE_TEST).then(() => console.log("connected successfully to Database one!!!!"));
}, 15000);



beforeEach(async () => {
    await usersModel.deleteMany({});
    await request(app).post("/").send(user1);
    // await blogsModel.deleteMany({});

});

// // TESTING USER ROUTES

describe("testing users routes", () => {
    test("Should create a user", async () => {
        const user = {
            email: "nadine@gmail.com",
            password: "123qwe",
            firstname: "nadine",
            lastname: "UN"
        }
        const response = await request(app)
            .post("/")
            .send(user)
            .expect(201)

        // console.log(response)
    })


    describe("POST /login", () => {
        test(" should login", async () => {
            const responsen = await request(app)
                .post("/login")
                .send({
                    email: user1.email,
                    password: user1.password
                })
                .expect(200)

            // console.log(responsen.body.token);
            // // store it in the auth object
            auth.token = responsen.body.token;

        })
    })


    describe("GET/ getAllUsers", () => {
        test("returns a list of users", async () => {
            const response = await request(app)
                .get("/getAllUsers")
                // add an authorization header with the token
                .set("authorization", auth.token);

            // console.log(response)
            expect(200)
            // console.log(`The auth is ${auth.token}`);
            const decoded = jwt.verify(auth.token, "secretkey");
            // console.log(`The decoded token is: ${decoded.tokenUser._id}`)


        });
    });

    describe("GET /users without auth", () => {
        test("requires login", async () => {
            // don't add an authorization header with the token...see what happens!
            const response = await request(app).post("/login").expect({ "message": "cannot find user" });
        });
    });


})

// TESTING COMMENTS ROUTES

describe("testing comments routes", () => {
    // let id = decoded.tokenUser._id
    let id = "624086c9bb3d84cc04d9fd24"
    describe("testing routes creating, /getOneblog/:id/comments", () => {
        test("should add comment", async () => {
            let comments;
            comments = await request(app).post(`"/getOneblog/${id}/comments"`)
                .send({
                    "content": "We like your blog"
                })
                .expect(201)
            console.log(id)
        })
    })
})


// TESTING BLOG ROUTES


describe("Testing blog routes", () => {

    // // CREATE USERS
    describe("Creation of blogs, POST/ createBlog", () => {
        test("should create a blog", async () => {

            let create = await request(app)
                .post("/createBlog")
                .set("authorization", auth.token)
                .send(blog1)
                .expect(201)
            // console.log(create)
            // console.log(auth.token)
        })
    })
    describe("Creation of blogs with missing content, POST/ createBlog", () => {
        test("should return content missing", async () => {
            const blogerr1 = {
                auth: "RUDASINGWA",
                title: "Blogs 1",
                image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Ftoppng.com%2Fweb-development-icon-png-clipart-website-development-web-dev-icon-PNG-free-PNG-Images_182941&psig=AOvVaw0REaDqkPIYpsHXHmge36ih&ust=1648364380657000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCNCO5P2Z4_YCFQAAAAAdAAAAABAD"
            }

            let create = await request(app)
                .post("/createBlog")
                .set("authorization", auth.token)
                .send(blogerr1)
                .expect(200)
                .expect({ "error": "content missing" })
        })
    })
    describe("Creation of blogs with missing title, POST/ createBlog", () => {
        test("should return title missing", async () => {
            const blogerr = {
                auth: "RUDASINGWA",
                image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Ftoppng.com%2Fweb-development-icon-png-clipart-website-development-web-dev-icon-PNG-free-PNG-Images_182941&psig=AOvVaw0REaDqkPIYpsHXHmge36ih&ust=1648364380657000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCNCO5P2Z4_YCFQAAAAAdAAAAABAD",
                content: "hello world of programming"
            }

            let create = await request(app)
                .post("/createBlog")
                .set("authorization", auth.token)
                .send(blogerr)
                .expect(200)
                .expect({ "error": "title missing" })
        })
    })
    describe("Creation of blogs with duplicate title, POST/ createBlog", () => {
        test("should return error for duplicate title", async () => {
            const blogerr = {
                title: "Software Development 123",
                auth: "RUDASINGWA",
                image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Ftoppng.com%2Fweb-development-icon-png-clipart-website-development-web-dev-icon-PNG-free-PNG-Images_182941&psig=AOvVaw0REaDqkPIYpsHXHmge36ih&ust=1648364380657000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCNCO5P2Z4_YCFQAAAAAdAAAAABAD",
                content: "hello world of programming"
            }

            let create = await request(app)
                .post("/createBlog")
                .set("authorization", auth.token)
                .send(blogerr)
                .send(blog1)
                .expect(200)
                .expect({ "message": "blog with title Software Development 123 exists" })
        })
    })

    //GETTING ALL BLOGS

    describe("GET/ getAllBlogs", () => {
        test("returns a list of  blogs", async () => {
            const response = await request(app)
                .get("/getAllBlogs")
                .expect(200)
            console.log(response)
        });
    });

})


// TESTING CONTACTS

describe("Testing contacts routes", () => {
    describe("Testing creation of queries", () => {
        test("Should create users", async () => {
            const query1 = {
                name: "UN Nad",
                email: "un@nad.com",
                message: "message message message"
            }

            const query = await request(app).post("/createcontact")
                .send(query1).expect(201)
        })
    })
    describe("Testing retrieving all queries", () => {
        test("Should get all queries", async () => {
            console.log(auth.token)
            const query = await request(app)
                .get("/getAllcontacts")
                .set("authorization", auth.token);
            expect(200)

        })
    })
    describe("Testing missing keys", () => {
        test("Should return error for missing message", async () => {
            const query2 = {
                name: "UN wanyawe",
                email: "un@nad.com",
            }
            const query = await request(app)
                .post("/createcontact")
                .send(query2)
                .expect(200)
                .expect({ "error": "message missing" })
        })
        test("Should return error for missing email", async () => {
            const query2 = {
                name: "UN",
                message: "message message message"
            }
            const query = await request(app)
                .post("/createcontact")
                .send(query2)
                .expect(200)
                .expect({ "error": "email missing" })
        })
        test("Should return error for missing name", async () => {
            const query2 = {

                email: "un@nad.com",
                message: "message message message"
            }
            const query = await request(app)
                .post("/createcontact")
                .send(query2)
                .expect(200)
                .expect({ "error": "email missing" })
        })
    })

    describe("Testing delete routes", () => {
        test("should delete query", async () => {
            const id = "62408f04810f6e93a6f3cb48";
            const deletequery = await request(app)
                .delete(`/deleteblog/${id}`)
                .set("authorization", auth.token);
            expect("deleted")
        })
    })

});




afterAll(done => {
    // Closing the DB connection allows Jest to exit successfully.
    mongoose.connection.close()
    done()
})





