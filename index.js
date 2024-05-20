 const express=require("express");
 const app=express();
 const port=8080;
 const path=require("path");
 app.set("view engine","ejs");
 app.set("views",path.join(__dirname,"views"));
 app.use(express.urlencoded({extended:true}));
 app.use(express.static(path.join(__dirname, 'public')));
 const { v4: uuidv4 } = require('uuid');
 var methodOverride = require('method-override');
 app.use(methodOverride('_method'));
let post=[
    {
        username:"deadshot",
        content:"deadshot is a good boy",
        id:uuidv4()
    },
 
]


 app.listen(port,()=>{
    console.log("port is listening");
 });
 
 app.get("/post",(req,res)=>{
    res.render("index.ejs",{post});
 });

 app.get("/post/new",(req,res)=>{
    res.render("form.ejs");
 });

 app.post("/post",(req,res)=>{
    let body=req.body;
    body["id"]=uuidv4();
    post.push(body);
    res.redirect("/post");
 });


 function findPostById(id){
    for(val of post){
        if(val.id==id){
            return val;
        }
    }
 }

 app.get("/post/:id",(req,res)=>{
    let {id}=req.params;
    let val=findPostById(id);
    res.render("singlepost",{val});
});
 
app.get("/post/:id/edit",(req,res)=>{
    let {id}=req.params;

    let w=findPostById(id);
    
    res.render("editpost.ejs",{w});
   
    
});
app.patch("/post/:id",(req,res)=>{
    let {id}=req.params;
    let {content}=req.body;
    let w=findPostById(id);
    w.content=content;
   res.redirect("/post");
});

app.delete("/post/:id",(req,res)=>{
    let {id}=req.params;
    let p=findPostById(id);
    console.log(p);
    post=post.filter((w)=>{
        return w!=p;
    })
    res.redirect("/post");
    
});




