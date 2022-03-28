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
const port = process.env.PORT;//

app.set('port', port);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/api', require('./routes/main_routes'));

app.use(function(req, res, next) {
    res.status(404);
    res.json({ error: 'Not found' });
});

app.listen(port, () => { console.log(`App running on port ${port}`) });