const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

const path = require("path");

const { v4: uuidv4 } = require("uuid"); 

const methodOverride = require("method-override");

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use(methodOverride("_method"));

let posts = [
    {
        id : uuidv4(),
        username : "InspireDaily",
        content : "Success is not final, failure is not fatal—it's the courage to continue that counts. Keep pushing forward! 💪✨ #Motivation #NeverGiveUp"
    },
    {
        id : uuidv4(),
        username : "WanderlustAdventures",
        content : "Just touched down in Bali! 🌴 The beaches here are unreal. Can't wait to explore more! Any recommendations? #TravelDiaries #BaliVibes"
    },
    {
        id : uuidv4(),
        username : "FoodieDelights",
        content : "Homemade pizza night! 🍕🔥 Toppings: pepperoni, mushrooms, and extra cheese. Who’s hungry? #FoodLover #HomeCooking"
    },
    {
        id : uuidv4(),
        username : "TechGeek2023",
        content : "Just got the new iPhone 15! The camera quality is insane. 📱✨ Anyone else upgraded yet? #TechTalk #GadgetLover"
    }
];

app.listen(port, () => {
    console.log(`Running on port ${port}`);
});

app.get("/", (req, res) => {
    res.redirect("/posts");
});

app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/posts", (req, res) => {
    let id = uuidv4();
    let { username, content } = req.body;
    posts.push({ id, username, content });
    res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs", { post });
});

app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", { post });
});

app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
});