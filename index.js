let express = require('express');
let app = express();
//Set Public Static folder

app.use(express.static(__dirname + '/public'));
//Server Port
app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), () => {
    console.log(`Server is running at port ${app.get('port')}`);
});