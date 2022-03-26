const Train = {
  name: String,
  people_count: Number,
  can_seperated: Boolean,
  cars:[
    {
      name:String,
      capacity:Number,
      taken_seats:Number
    }
  ]
}

module.exports = Train;