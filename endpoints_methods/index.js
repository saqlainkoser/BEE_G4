//nodejs 

const http=require('http');
const fs=require('fs');
const url=require('url');

const hostname='127.0.0.1';
const port=3000;

const server=http.createServer((req,res)=>{

    //my first endpoint point 
    console.log(url.parse(req.url,true));
    const parsedURL = url.parse(req.url,true);
    console.log(parsedURL.query.id);
    console.log(parsedURL.pathname);

    console.log(req.method);
    //First end point 
    if(req.url=="/products" && req.method=="GET"){
        // res.end("Get all the products");
        //ALL PRODUCTS DATA
        fs.readFile("./products.json","utf-8",(err,data)=>{
            if(err==null){
                res.end(data);
            }
            else{
                res.end("Something wrong");
            }
        })


    }

    else if(req.url=="/services" && req.method=="GET"){
        res.end("Get all the services");
    }



    //c3
    
})

server.listen(port,hostname,()=>{console.log(`Server is Running at http://${hostname}:${port}`)});