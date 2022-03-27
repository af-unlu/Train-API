
const validate = (req, res,next) => {
    const { Tren,RezervasyonYapilacakKisiSayisi,KisilerFarkliVagonlaraYerlestirilebilir } = req.body;
    let missingFields = [];
    let validationError = false;



    if(Tren !=null){
        //exist
        if(!(typeof Tren =="object")){
            missingFields.push("Tren Obje Değil");
            validationError=true;
        }
        else{
            if(Tren.Ad !=null){
                //exist
                if(!(typeof Tren.Ad=="string")){
                    missingFields.push("Tren Ad Tip Error");
                    validationError=true;
                }
            }
            else{
                missingFields.push("Tren Ad");
                validationError=true;
            }

            if(Array.isArray(Tren.Vagonlar)){
                Tren.Vagonlar.forEach(element => {
                    let both_exist = true;
                    if(element.Ad !=null){
                        //exist
                        if(!(typeof element.Ad=="string")){
                            missingFields.push("Ad Tip Error");
                            validationError=true;
                        }
                    }
                    else{
                        missingFields.push("Ad");
                        validationError=true;
                    }
                    //
                    if(element.Kapasite !=null){
                        //exist
                        if(!(typeof element.Kapasite=="number")){
                            missingFields.push("Kapasite Tip Error");
                            validationError=true;
                            both_exist = false;
                        }
                    }
                    else{
                        missingFields.push("Kapasite");
                        validationError=true;
                        both_exist = false;
                    }
                    //
                    if(element.DoluKoltukAdet !=null){
                        //exist
                        if(!(typeof element.DoluKoltukAdet=="number")){
                            missingFields.push("DoluKoltukAdet Tip Error");
                            validationError=true;
                            both_exist = false;
                        }
                    }
                    else{
                        missingFields.push("DoluKoltukAdet");
                        validationError=true;
                        both_exist = false;
                    }
                    if(element.DoluKoltukAdet>element.Kapasite){
                        missingFields.push(element.Ad+" DoluKoltukAdet Kapasiteden fazla olamaz");
                        validationError=true;
                    }
                });
            }else{
                missingFields.push("Vagonlar Tip Error");
                validationError=true;
            }
        }
    }
    else{
        missingFields.push("Tren");
        validationError=true;
    }

    if(RezervasyonYapilacakKisiSayisi !=null){
        //exist
        if(!(typeof RezervasyonYapilacakKisiSayisi=="number")){
            missingFields.push("RezervasyonYapilacakKisiSayisi Tip Error");
            validationError=true;
        }
    }
    else{
        missingFields.push("RezervasyonYapilacakKisiSayisi");
        validationError=true;
    }

    if(KisilerFarkliVagonlaraYerlestirilebilir !=null){
        //exist
        if(!(typeof KisilerFarkliVagonlaraYerlestirilebilir=="boolean")){
            missingFields.push("KisilerFarkliVagonlaraYerlestirilebilir Tip Error");
            validationError=true;
        }
    }
    else{
        missingFields.push("KisilerFarkliVagonlaraYerlestirilebilir");
        validationError=true;
    }


    res.locals.validationError = validationError;
    res.locals.missingFields = missingFields;
    next();
}


module.exports = { validate };
