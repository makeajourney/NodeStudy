/**
 * Created by Soyoun on 16. 8. 13..
 */

var http = require('http');
var fs = require('fs');

http.createServer(function(req, res) {      // HTTP Server를 생성하고 응답 로직을 정의한 콜백을 사용
    if (req.url == '/') {
        fs.readFile('./title.json', function(arr, data) {      // JSON 파일을 읽고 파일 내용을 처리할 방법을 정의한 콜백을 사용
            if (err) {
                console.error(err);
                res.end('Server Error');
            }
            else {
                var titles = JSON.parse(data.toString());       // JSON 텍스트를 파싱

                fs.readFile('./template.html', function(err, data) {        // HTML 템플릿을 읽고 템플릿이 로드됐을 때 콜백 사용
                    if (err) {
                        console.err(err);
                        res.end('Server error');
                    }
                    else {
                        var tmpl = data.toString();

                        var html = tmpl.replace('%', titles.join('</li><li>'));     // 블로그 글의 제목을 보여줄 HTML 페이지 조합
                        res.writeHead(200, {'Content-Type': 'text/html'});
                        res.end(html);      // 사용자에게 HTML 페이지 전송
                    }
                });
            }
        });
    }
}).listen(8000, "127.0.0.1");
