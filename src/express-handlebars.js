const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public")); 

// Handlebars
app.engine("hbs", exphbs.engine({ extname: "hbs", defaultLayout: "main" }));
app.set("view engine", "hbs");

// Blog posts
let posts = [
    { id: 1, title: "1", content: "My first blog post." },
    { id: 2, title: "2", content: "My second blog post." }
];

// Routing
app.get("/", (req, res) => {
    res.render("home", { posts });
});

// Allows us to display individual posts
app.get("/post/:id", (req, res) => {
    const post = posts.find(p => p.id == req.params.id);
    if (post) {
        res.render("post", { post });
    } else {
        res.status(404).send("Post not found");
    }
});

// Adds new posts
app.post("/add", (req, res) => {
    const { title, content } = req.body;
    const newPost = { id: posts.length + 1, title, content };
    posts.push(newPost);
    res.redirect("/");
});

// Starts the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

