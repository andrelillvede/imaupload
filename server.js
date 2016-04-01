var express = require('express');
var app = express();
var multer = require('multer');
var fs = require('fs');
var serveIndex = require('serve-index');

var exphbs = require('express-handlebars');
app.engine('.hbs', exphbs({defaultLayout: 'single', extname: '.hbs'}));
app.set('view engine', '.hbs');

app.use(express.static('files'));

app.use('/files', serveIndex('files'));

var upload = multer({ storage: multer.memoryStorage() })

app.get('/', function(req, res) {
  fs.readdir('files', function(err, files){
    res.render('index', {
      files: files,
      hostname: req.headers.host
    });
  })
});

app.post('/', upload.array('images'), function(req, res, next) {
  for (var image of req.files) {
    fs.writeFile(`files/${image.originalname}`, image.buffer, (err) => {
      if (err)
        res.send('error:', err);
      else
        console.log(`${image.originalname} uploaded`)
    });
  }
  res.redirect('/');
})


app.listen(3000, function () {
  console.log('app listening on port 3000!');
});
