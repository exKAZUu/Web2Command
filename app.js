var express = require('express'),
  bodyParser = require('body-parser'),
  app = express(),
  multer  = require('multer'),
  exec = require('child_process').exec;

var port = process.env.PORT || 3000;
var cmd = 'mono /home/takayuki/tmp/Release/DetectionByNGLM.exe'

// res.render で省略するデフォルトの拡張子を設定
app.set('view engine', 'jade');

app.use(multer({ dest: './uploads/'}));

// POSTデータをパースするミドルウェアを設定
app.use(bodyParser.json({
  extended: true
}));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function(req, res) {
  res.render('index', { stdout: '', stderr: '', error: '' });
});

app.post('/upload', function(req, res) {
  exec(cmd + ' ' + req.files.code.path, function (error, stdout, stderr) {
    res.render('index', { stdout: stdout, stderr: stderr, error: error });
  });
});

var server = app.listen(port, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Server running at http://%s:%s', host, port);
});
