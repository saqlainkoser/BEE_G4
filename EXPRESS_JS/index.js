const express=require('express');

var app = express();

//middleware

app.use((req,res,next)=>{
    console.log("I am middleware #1");
    next()
})


app.use((req,res,next)=>{
    console.log("I am middleware #2");
    next()
})

app.get('/', (req, res) => {
res.send('Hello Express')
});


app.get('/products', (req, res) => {
    res.send('Hello Products')
    });

//Dynamic routing
// /products/iphone/iphone13
// /products/iphone/iphone14
// /products/iphone/iphone16
// 

app.get('/products/iphone/:model', (req, res) => {
    res.send(`THis is iphone ${req.params.model}`)
    });

app.get('/products/iphone/iphone13', (req, res) => {
    res.send('This is iphone13 page ')
    });




app.listen(3555)