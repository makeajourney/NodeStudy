var net = require('net');
var server = net.createServer(function(socket) {
    socket.on('data', function(data) {      // 새로운 데이터를 읽을 때 마다 data 이벤트가 처리됨
        socket.write(data);     // 클라이언트에 데이터 쓰기(되돌려 보내기)
    });
});

server.listen(8888);