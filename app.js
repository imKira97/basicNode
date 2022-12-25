//importing global module using require keyword
const http=require('http');
const fs=require('fs');
const { buffer } = require('stream/consumers');

//requestListener function
// function reqList(request,response){

// }
//create server 
// http.createServer(reqList);


// we can also pass function as argument

// http.createServer(function(req,res){

// });

//also using arrow fun

//this is our create server callback fn. it will be called whenever request reaches our server
//this method returns a server instance

//task 7
// const server=http.createServer((req,res)=>{
//     console.log(req.url);
//     if(req.url==='/home'){
//         res.write('hello');
//         return res.end();
//     }
//     if(req.url==='/about'){
//         res.write('about us page');
//         return res.end();
//     }
//     if(req.url==='/node'){
//         res.write('welcome to node js project');
//         return res.end();
//     }

// });

/*
listen starts the process where nodejs will not immediately exit our script but instead it will keep this running to listen incoming requests
it take argument of port this is port number where we want to listen 
*/
// server.listen(4000);

//task 8

const server=http.createServer((req,res)=>{
    const url=req.url;
    const method=req.method;
    if(url==='/'){

        res.write('<html>');
        res.write('<head><title>ENter message </title></head>');
        res.write('<body>  <form action="/message" method="POST"> <input type="text" name="message"><button type="submit">Send</button></form>  </body>');
        res.write('</html>');
        return res.end();
    }

    //write in file when submit button is click and user must redirect to "/"
    // /message because our form action is /message
    if(url==='/message' && method==='POST'){
        // on method. Now on allows us to listen to certain events and the event I want to listen to here is the data event

        const body=[];
        req.on('data',(chunk)=>{
            console.log(chunk);
            body.push(chunk);
        });

        return req.on('end',()=>{
            const parsedBody=Buffer.concat(body).toString();
            const messageReceived=parsedBody.split('=')[1];

            //this method will hold code execution we write in file
            // fs.writeFileSync('message.txt',messageReceived);
            // res.statusCode=302;
            // res.setHeader('Location','/');
            // return res.end();

            fs.writeFile('message.txt',messageReceived,(err)=>{
                res.statusCode=302;
                res.setHeader('Location','/');
                return res.end();
            })

        })
    
    }

    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My first Page</title></head>');
    res.write('<body><h1>First Node js project</h1></body>');
    res.write('</html>');
    return res.end();

});
server.listen(3000);