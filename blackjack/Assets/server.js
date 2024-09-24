const http = require('http');
const fs = require('fs');
http.createServer((req, res) => {
    fs.readFile('../main.html', (err, data)=> {
        res.readFile(200, {'Content-Type': 'text/html'})
        res.write(data)
        res.end()
    }) 
}).listen(8000)