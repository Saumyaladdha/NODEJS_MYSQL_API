const http=require('http');
const app=require('./app');
const port=3050;


const server=http.createServer(app);

server.listen(port);


