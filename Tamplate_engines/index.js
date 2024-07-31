//definition -  html ki tarah dikhne wala syntx jisme ham varibles paas kar sakte hain 
//ejs - Embedded Javascript

//ejs install
//npm install ejs

//configure ejs
//app.set("view engine","ejs");

//make folder named - views

//will add ejs file there 

// replace send with render


const express=require('express');

var app = express();

app.set("view engine","ejs");

app.get('/', (req, res) => {
res.render('index',{name:"shaan"})
});

//MYPAGE
app.get('/mypage', (req, res) => {
    res.render('mypage',{name:"shaan"})
    });
    



app.listen(4001)

