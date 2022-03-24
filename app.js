const Routes = require('./routes/main_routes');

const express = require("express");
const cors = require("cors");
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();
app.use(express.json());
app.use(cors());


const port = process.env.NODE_ENV || 3000;

app.set('port', port);

// load app middlewares
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/api', Routes);

//#region 404
app.get('*',(req,res)=>{
    res.status(404).json({"message":"The Get route you wanted to acces is not exist"});
});
app.post('*',(req,res)=>{
    res.status(404).json({"message":"The Post route you wanted to acces is not exist"});
});
//#endregion


app.listen(port, () => { console.log(`App running on port ${port}`) });