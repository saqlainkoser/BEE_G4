//nodejs 
//Changed by GITHUB

const http=require('http');

const hostname='127.0.0.1';
const port=3000;

const server=http.createServer((req,res)=>{

    //c1
    res.statusCode=200;
    //c2
    res.setHeader('Content-Type','text/plain');
    //c3
    res.end("Hello G4");
})

server.listen(port,hostname,()=>{console.log(`Server is Running at http://${hostname}:${port}`)});
