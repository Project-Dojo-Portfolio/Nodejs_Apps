const http = require('http');
const fs = require('fs');

function rqListener(req, res){
    const url = req.url;
    const method = req.method;
    if(url === '/') {
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body><h1>Hello world 2</h1></body>')
        res.write('</html>');
        return res.end();
    }
    if(url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk)=> {
            body.push(chunk);
        });
        req.on('end', () => {
            const parseBody = Buffer.concat(body).toString();
            fs.writeFileSync('message.txt', parseBody);
        });
        
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My first Page</title></head>');
    res.write('<body><h1>Hello world</h1></body>')
    res.write('</html>');
    res.end();
}

const server = http.createServer(rqListener);

server.listen(3000);

