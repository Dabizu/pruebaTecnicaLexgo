const express =require("express");
const app=express();
const config=require("./config.js");
app.use(express.static(__dirname+"/public"));
app.use(express.static("public"));

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/public/index.html");
});

app.use('/', require('./db/Administradora'));

app.listen(config.PORT,()=>{console.log("server corriendo")});