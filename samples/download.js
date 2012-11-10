var fs = require('fs');
var http = require('http');
var url = require('url');

function download(source, dest, callback) {
  console.log('Downloading file ' + source + ' to ' + dest);
  if ('http' === source.substring(0,4).toLowerCase()) {
    var parsedUrl = url.parse(source);
    var host = parsedUrl.hostname;
    var filename = parsedUrl.pathname;

    var client = http.createClient(80, host); 
    var request = client.request('GET', source, {'host': host});
    request.on('response', function (response) {
      console.log('STATUS: ' + response.statusCode);
      console.log('HEADERS: ' + JSON.stringify(response.headers));

      var file = fs.createWriteStream(dest, {'flags': 'a'});
      response.on('data', function(chunk){
        file.write(chunk, encoding='binary');
      });
      response.on('end', function(){
        file.end();
        callback();
      });
    });
    request.end();
  } else {
    var is = fs.createReadStream(source);
    var os = fs.createWriteStream(dest);
    util.pump(is, os, function() {
      callback();
    });
  }
}

var args = process.argv.slice(2);

download(args[0], args[1], function () {
  console.log('Download done');
});

