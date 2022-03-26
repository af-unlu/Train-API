

const Train = require("../models/train");


module.exports.get = async (req, res) => {
    res.status(200).json({"message":"Hello There"});
}
module.exports.post = async (req, res) => {

res.json(res.locals.missingFields);

}
