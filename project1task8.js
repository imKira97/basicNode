const http=require('http');
const fs=require('fs');

const server=http.createServer((request,response)=>{
    const url=request.url;
    const method=request.method;

    if(url==='/'){

        const filename="message.txt";
        const data=fs.readFileSync(filename,(err)=>{
            console.log(err);
        })
        response.write('<html>');
        response.write('<head><title>ENter message </title></head>');
        response.write(`${data}`);
        response.write('<body>  <form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form>  </body>');
        response.write('</html>');
        return response.end();
    }

    if(url==='/message' && method==='POST'){

        const body=[];
        request.on('data',(chunk)=>{
            body.push(chunk);
        });
        return request.on('end',()=>{
            const parsedBody=Buffer.concat(body).toString();
            const messageReceived=parsedBody.split('=')[1];
            fs.writeFile('message.txt',messageReceived,(err)=>{
                response.statusCode=302;
                response.setHeader('Location','/');
                return response.end();
            })
        })
    }
});
server.listen(4000);