const net = require('net');
let server = net.createServer(function(conn) {
    console.log('Client Connected');

    conn.on('end', () => {
        console.log('client disconnected');
    });
    conn.write('Hello World!\r\n');
    conn.pipe(conn);
});

server.listen(3000, function() {
    console.log('Server running on http://localhost:3000');
});
