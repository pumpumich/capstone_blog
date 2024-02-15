import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const date = new Date();
var day = date.getDate();
var month = date.getMonth() + 1;
var year = date.getFullYear();

function Post(postHeader, postText){
    this.postHeader = postHeader;
    this.postText = postText;
    this.date = `${day}/${month}/${year}`
};


var postsWall=[];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs", {
        postsWall: postsWall
    });
});

app.get("/post", (req, res) => {
    res.render("post.ejs", {
        postsWall: postsWall
    });
});

app.post("/createNewPost", (req, res) => {
    // console.log(req.body);
    var newPost = new Post(req.body['header'], req.body['textPost']);
    postsWall.push(newPost);
    res.render("post.ejs", {
        postsWall : postsWall});

});

app.post("/deletePost", (req, res) => {
    console.log(req);
    console.log("clickde");
    res.render("post.ejs", {
        postsWall : postsWall});
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
  