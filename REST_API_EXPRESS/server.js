
const express=require('express');

const app= require('./index.js')
// app.use(express.json())


const port =8686;

app.listen(port , ()=>{
    console.log("Server is running .... ");
})


