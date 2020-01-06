let express = require('express');
let app = express();

app.use(express.urlencoded({
    extended: true
  }));

app.use(express.static(__dirname + '/public'));

let expressHbs = require('express-handlebars');
let hbs = expressHbs.create({
    extname: 'hbs',
    defaultLayout: 'layout',
    helpers: require("./helpers/handlebars.js").helpers,
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/'
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');


// =======
require('./middlewares/sessionmiddleware')(app);
require('./middlewares/localsmiddleware')(app);
// >>>>>>> a1cf749ae8366674d5654c5f1e581d38db4429d8
require('./middlewares/routemiddleware')(app);



app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), () => {
    console.log(`Server is runnning at port ${app.get('port')}`)
});