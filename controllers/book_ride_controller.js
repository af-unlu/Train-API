const Train = require("../models/train");
const Bookings = require("../models/bookings");


module.exports.get = async (req, res) => {
    res.status(200).json({"message":"Hello There"});
}
module.exports.post = async (req, res) => {
//res.locals.missingFields
//res.locals.validationError
    if(res.locals.validationError){
        res.status(400).json({"Message":"Bad Request","Errors":res.locals.missingFields});
    }else
    {
        //Business Logic Here

    }

}
