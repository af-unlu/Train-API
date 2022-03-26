const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');

const app = express();
app.use(express.json());
app.use(cors());

app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).send({ status: 404, message: err.message }); // Bad request
    }
    next();
});
const port = process.env.NODE_ENV || 3000;

app.set('port', port);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/api', require('./routes/main_routes'));

//#region 404
app.get('*',(req,res)=>{
    res.status(404).json({"message":"The Get route you wanted to acces is not exist"});
});
app.post('*',(req,res)=>{
    res.status(404).json({"message":"The Post route you wanted to acces is not exist"});
});
//#endregion


app.listen(port, () => { console.log(`App running on port ${port}`) });