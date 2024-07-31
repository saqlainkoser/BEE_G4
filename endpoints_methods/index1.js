
    const fs=require('fs');
const url=require('url');

const hostname='127.0.0.1';
const port=3020;


const server=http.createServer((req,res)=>{

    const ParsedURL=url.parse(req.url,true);
    const products=fs.readFileSync("./products.json","utf-8");

    //First end point get all the products 
    if(ParsedURL.pathname=="/products" && req.method=="GET" && ParsedURL.query.id==undefined){
        res.end(products);
    }


    //Second end point single data
    else if(ParsedURL.pathname=="/products" && req.method=="GET" && ParsedURL.query.id!==undefined){
        let productArray=JSON.parse(products);

        let product=productArray.find((product)=>{
            return product.id==ParsedURL.query.id;
        })
        // console.log(product);
        if(product!==undefined){
            res.end(JSON.stringify(product))
        }
        else{
            res.end("Product not found")
        }
    }

    //third endpoint post data

    else if(ParsedURL.pathname=="/products" && req.method=="POST"){
        let product="";

        //Collecting the chunks and making single data
        req.on("data",(chunk)=>{
            product=product+chunk;
        })

        req.on("end",()=>{
            // console.log(product)//
            let productArray=JSON.parse(products);
            let newProduct=JSON.parse(product);

            productArray.push(newProduct);

            // console.log(productArray);
            fs.writeFile("./products.json",JSON.stringify(productArray),(err)=>{
                if(err==null){
                    res.end("New product added");
                }
            })


        })

    }

    //To Delete any product's data
    else if(ParsedURL.pathname=="/products" && ParsedURL.query.id!=undefined && req.method=="DELETE"){
        // console.log("this is my Delete req");
        let productArray=JSON.parse(products);
        //to find index

        let Index=productArray.findIndex((product)=>{
            return product.id==ParsedURL.query.id;
        })

        productArray.splice(Index,1);

        fs.writeFile("./products.json",JSON.stringify(productArray),(err)=>{
            if(err==null){
                res.end("Product Deleted.");
            }
        })

    }

    //to put any updated data
    else if(ParsedURL.pathname=="/products" && ParsedURL.query.id!=undefined && req.method=="PUT"){
        //fetching the data
        let product=""
        req.on("data",(chunk)=>{
            product=product+chunk;
        })
        req.on("end",()=>{
            console.log("i am inside req on end")
            //convert all data to JSOBJECT / ARRAY
            let productArray=JSON.parse(products);
            let productOBJ=JSON.parse(product);
            //FIND index
            let Index=productArray.findIndex((product)=>{
                return product.id==ParsedURL.query.id;
            })


            //Write operation to put
            productArray[Index]=productOBJ;

            //to override the JSON file
            fs.writeFile("./products.json",JSON.stringify(productArray),(err)=>{
                if(err==null){
                    res.end("Product Updated");
                }
            })
        })


    }




    
})

server.listen(port,hostname,()=>{console.log(`Server is Running at http://${hostname}:${port}`)});