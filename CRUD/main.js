// main.js

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const multer=require('multer');
const app = express();

// Load environment variables from .env file
dotenv.config();
const PORT = process.env.PORT || 5000;
app.use(express.urlencoded({extended:true}));

mongoose.connect(process.env.DB_URI)
.then(()=>{
    console.log("done");
})
.catch(()=>
{
    console.log("not done");
})


//multer

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  const upload = multer({ storage: storage })


const User=require("./model/user")

app.set("view engine","ejs");

app.get("/",(req,res)=>{
        res.render("index")
});
app.get("/add",(req,res)=>{
    res.render("add_user")
});


app.post("/add", upload.single("avatar"), (req,res,next)=>{

  const data=new User(req.body);
      data.save()
    res.send("save")
});


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});