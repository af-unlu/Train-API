const {validate} = require('node-model-validation')
const Train = require("../models/train");


module.exports.get = async (req, res) => {
    res.status(200).json({"message":"Hello There"});
}
module.exports.post = async (req, res) => {

    let result = validate(req.body, Train);
    res.status(200).json({
        "result":result
    });

}

/*
const referenceModel = {
  firstName: {
    type: String,
    isRequired: true
  },
  lastName: {
    type: String,
    isRequired: true
  },
  age: {
    type: Number,
    isRequired: true
  },
  favoriteFoods: {
    type: [],
    isRequired: true
  },
}
 
const sampleModel = {
  firstName: 'John',
  lastName: 'Smith',
  age: 27,
  favoriteFoods: [],
  misc: 'random'
}
 
let result = validate(sampleModel, referenceModel)
 */