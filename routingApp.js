//importing global module using require keyword


//task 9 clean up code connecting routingApp.js to route.js
const http=require('http');

//importin file
const route=require('./route');



const server=http.createServer(route);
server.listen(3000);