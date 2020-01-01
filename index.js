let express = require('express');
let app = express();

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

//test
app.get('/', (req, res) => {
    res.render('index');
});
app.get('/:page', (req, res) => {
    let page = req.params.page;
    res.render(page,);
});
//

require('./middlewares/routemiddleware')(app);



app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), () => {
    console.log(`Server is runnning at port ${app.get('port')}`)
});