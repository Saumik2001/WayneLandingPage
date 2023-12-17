const express= require("express");
const fs=require("fs");
const path= require("path");
var mongoose=require("mongoose");
mongoose.connect('mongodb://localhost:27017/saumik', { useNewUrlParser: true, useUnifiedTopology: true })
const port=80;
const internal=require("stream");
const bodyparser=require("body-parser");
const app=express();
const home=fs.readFileSync("main1.html");
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded());
app.get("/",(req,res)=>{
    res.end(home);
})
var FormSchema= new mongoose.Schema({
    Customname:String,Password:String,Address:String,Email:String,City:String,State:String,PIN:String
})
var FormData= mongoose.model('Form',FormSchema);
app.post("/",(req,res)=>{
    var Enroll= new FormData(req.body);
    Enroll.save().then(()=>{
        res.send("You have been enrolled. redirect//");
    })
})
app.listen(port,()=>{
    console.log(`app started at port ${port}`);
})