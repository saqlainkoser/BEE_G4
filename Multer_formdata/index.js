const express = require('express')
const app = express();
const multer = require('multer');
const path = require('path');
app.set("view engine","ejs");

//Defining Storage
const storage = multer.diskStorage({
    //Desiding destination
    destination:(req,file,cb) =>{
        cb(null,'Images')
    },
    //Changing file name every time
    filename:(req,file,cb)=>{
        console.log(file);
        cb(null,Date.now()+path.extname(file.originalname)) 
    }  

})
//uploading the file
//making middle ware
const upload = multer({storage:storage});


app.get("/upload",(req,res)=>{
    res.render("upload");
})

app.post("/upload",upload.single('image'),(req,res)=>{
    res.send("image uploaded")
})


app.listen(7575);
console.log("7575 is the port");
