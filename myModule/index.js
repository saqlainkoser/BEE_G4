//nodejs 

const http=require('http');
const hostname='127.0.0.1';
const port=3000;
const mymodule=require('./myModulefile')

const server=http.createServer((req,res)=>{

    //c1
    res.statusCode=200;
    //c2
    res.setHeader('Content-Type','text/plain');
    //c3
    res.end("Hello G4" + mymodule.myDateTime());
})

server.listen(port,hostname,()=>{console.log(`Server is Running at http://${hostname}:${port}`)});