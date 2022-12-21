//importing global module using require keyword
const http=require('http');

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
const server=http.createServer((req,res)=>{
    console.log('shiva');
    //console.log(req);
});

/*
listen starts the process where nodejs will not immediately exit our script but instead it will keep this running to listen incoming requests
it take argument of port this is port number where we want to listen 
*/
server.listen(4000);