
const validate = (req, res,next) => {
    const { name, people_count, can_seperated,cars } = req.body;
    let missingFields = [];
    let validationError = false;

    if(name){
        if(!(typeof name =="string")){
            missingFields.push("name");
            validationError=true;
        }
    }else{
        missingFields.push("name");
        validationError=true;
    }

    if(people_count){
        if(!(typeof people_count =="number")){
            missingFields.push("people_count");
            validationError=true;
        }
    }
    else{
        missingFields.push("people_count");
        validationError=true;
    }

    if(can_seperated){
        if(!(typeof can_seperated =="boolean")){
            missingFields.push("can_seperated");
            validationError=true;
        }
    }
    else{
        missingFields.push("can_seperated");
        validationError=true;
    }

    if(cars){
        if(!(typeof cars =="object")){
            missingFields.push("cars");
            validationError=true;
        }else
        {

            cars.forEach(element => {
                if(element.name){
                    if(!(typeof cars.name =="string")){
                        missingFields.push("cars.item.name");
                        validationError=true;
                    }
                }else{
                    missingFields.push("cars.name");
                    validationError=true;
                }
    
                if(element.capacity){
                    if(!(typeof cars.capacity =="number")){
                        missingFields.push("cars.item.capacity");
                        validationError=true;
                    }
                }
                else{
                    missingFields.push("cars.item.capacity");
                    validationError=true;
                }
                
                if(element.taken_seats){
                    if(!(typeof cars.taken_seats =="number")){
                        missingFields.push("cars.item.taken_seats");
                        validationError=true;
                    }
                }
                else{
                    missingFields.push("cars.item.taken_seats");
                    validationError=true;
                }
            });
        }
    }
    else{
        missingFields.push("cars");
        validationError=true;
    }
    res.locals.validationError = validationError;
    res.locals.missingFields = missingFields;
    next();
}


module.exports = { validate };
