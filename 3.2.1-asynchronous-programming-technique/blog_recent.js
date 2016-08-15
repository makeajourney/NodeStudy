/**
 * Created by Soyoun on 16. 8. 13..
 */

var http = require('http');
var fs = require('fs');

var server = http.createServer(function (req, res) {    // 클라이언트 요청의 최초 진입점
    getTitles(res);     // getTitles로 제어를 넘김
}).listen(8000, "127.0.0.1");

function getTitles(res) {   // getTitles에서 제목을 가져오고 getTemplate에 제어를 넘김
    fs.readFile('./titles.json', function (err, data) {     // JSON 파일을 읽고 파일 내용을 처리할 방법을 정의한 콜백을 사용
        if (err) return hadError(err, res)          // 오류가 발생하면 함수를 더는 실행할 필요가 없으므로 else 분기를 만드는 대신 반환한다
        getTemplate(JSON.parse(data.toString()), res);      // JSON 텍스트를 파싱해서 getTemplate로 넘김
    });
}

function getTemplate(titles, res) {     // getTemplate에서 템플릿 파일을 읽은 후 formatHtml에 제어를 넘김
    fs.readFile('./template.html', function (err, data) {       // HTML 템플릿을 읽고 템플릿이 로드됐을 때 콜백 사용
        if (err) return hadError(err, res)
        formatHtml(titles, data.toString(), res);
    });
}

function formatHtml(titles, tmpl, res) {        // formatHtml은 제목과 템플릿으로 클라이언트에 응답할 페이지를 렌더링
    var html = tmpl.replace('%', titles.join('</li><li>'));     // 블로그 글의 제목을 보여줄 HTML 페이지 조합
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(html);      // 사용자에게 HTML 페이지 전송
}

function hadError(err, res) {
    console.error(err);
    res.end('Server Error');
}