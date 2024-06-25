import express from "express";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const app = express();
const port = 3000 ; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(join(__dirname, 'public')));

app.set('view engine', 'ejs');

let blogPosts = [];

app.get("/" , (req , res)=>{

    res.render("index.ejs" , {
        blogPosts : blogPosts
    });
    console.log("here1");
});

app.get("/create" , (req,res)=>{
    res.render("create.ejs");
    console.log("here2");
});

app.use(express.urlencoded({extended:true}));

let id = 0 ; 
app.post("/create" , (req ,res) =>{
    console.log("here3");
    const title = req.body["blog1"];
    const content = req.body["blog2"];
    blogPosts.push({ id,title, content });
    id=id+1;
    res.redirect("/");
});

app.get(`/blogpage/:id`, (req,res)=>{
    // console.log(req);
    const postId = req.params.id;
    res.render("blogpage.ejs" , {
        post : blogPosts[postId]
    });
});

app.get("/delete/:id", (req, res) => {
    const postId = req.params.id;
    console.log(postId);
    console.log(blogPosts);
    let newBlogPosts = blogPosts.filter(function(post , index) {
        console.log(!(post.id===postId));
        console.log(typeof(post.id));
        console.log(typeof(parseInt(postId, 10)));
        let postId1 = parseInt(postId, 10);
        console.log(!(post.id===postId1));
        console.log(index);
        return !(post.id===postId1);
    }).map((post, index) => {
        return {
            ...post,
            id: index 
        };
    });
    console.log(newBlogPosts);
    blogPosts=newBlogPosts;
    console.log(blogPosts);
    res.redirect("/");
});

app.get(`/edit/:id`, (req,res)=>{
    const postId = parseInt(req.params.id);
    res.render("edit.ejs",{
        post : blogPosts[postId]
    });
});

app.post(`/edit/:id`, (req,res)=>{
    const postId = parseInt(req.params.id);
    console.log(req.body);
    blogPosts[postId].title = req.body.blog1;
    blogPosts[postId].content = req.body.blog2;
    res.redirect("/");
});

app.listen(port , ()=>{
    console.log(`listening on ${port}`);
});

