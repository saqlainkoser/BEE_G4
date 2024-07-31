//Static files server in Express

const express=require('express');

const app=express();

//starting me ek build in middleware
app.use(express.static('./public'))


app.get("/",(req,res)=>{
    console.log("Static files servered");
})
app.listen(8888);