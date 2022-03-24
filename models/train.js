const Train = {
  name: {
    type: String,
    isRequired: true
  },
  people_count: {
    type: String,
    isRequired: true
  },
  can_seperated: {
    type: Boolean,
    isRequired: true
  },
  cars: {
    type: [{
      name:{
        type:String,
        isRequired:true
      },
      capacity:{
        type:Number,
        isRequired:true
      },
      taken_seats:{
        type:Number,
        isRequired:true
      }
    }],
    isRequired: true
  },
}

module.exports = Train;