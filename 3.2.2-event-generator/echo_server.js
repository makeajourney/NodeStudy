var net = require('net');
var server = net.createServer(function(socket) {
    socket.once('data', function(data) {      // data 이벤트 한번만 처리됨
        socket.write(data);     // 클라이언트에 데이터 쓰기(되돌려 보내기)
    });
});

server.listen(8888);