
module.exports.get = async (req, res) => {
    res.status(200).json({"message":"Hello There"});
}

module.exports.post = async (req, res) => {
    //res.locals.missingFields
    //res.locals.validationError
    if(res.locals.validationError){
        //check if input is valid
        res.status(400).json({"Message":"Bad Request","Errors":res.locals.missingFields});
    }else
    {
        const { Tren,RezervasyonYapilacakKisiSayisi,KisilerFarkliVagonlaraYerlestirilebilir } = req.body;
        
        let rezYapilabilir = false;
        let yerlesimAyrinti =[];
        let avaible =0;
        Tren.Vagonlar.forEach(element => {
            const flag =(Math.floor((element.DoluKoltukAdet/element.Kapasite))>0.7)?false:true;
            avaible +=(flag)?(Math.floor(((element.Kapasite*7)/10))-element.DoluKoltukAdet):0;
        });
        for(let i=0;i<Tren.Vagonlar.length;i++){
            element = Tren.Vagonlar[i];
            //Math.floor(number)
            //Math.floor((element.DoluKoltukAdet/element.Kapasite))
            element.rezYapilabilir =(Math.floor((element.DoluKoltukAdet/element.Kapasite))>0.7)?false:true;
            element.eklenebilirkisi =(element.rezYapilabilir)?(Math.floor(((element.Kapasite*7)/10))-element.DoluKoltukAdet):0;
            element.tekdeAlabilir = (element.eklenebilirkisi>=RezervasyonYapilacakKisiSayisi);

            if(element.tekdeAlabilir){
                //tek vagona yerleşebilirlerse yerleştir
                yerlesimAyrinti = [];
                yerlesimAyrinti.push({"VagonAdi":element.Ad,"KisiSayisi":RezervasyonYapilacakKisiSayisi});
                rezYapilabilir = true;
                break;//yerleştirildiler break
            }
            else{
                if(KisilerFarkliVagonlaraYerlestirilebilir){
                    if(avaible>=0){
                        if(element.eklenebilirkisi){
                            yerlesimAyrinti.push({"VagonAdi":element.Ad,"KisiSayisi":element.eklenebilirkisi});
                        }
                        avaible-element.eklenebilirkisi;
                    }
                }
                else{
                    rezYapilabilir = false;
                }
            }
        }
        if(avaible>=RezervasyonYapilacakKisiSayisi){
            if(KisilerFarkliVagonlaraYerlestirilebilir){
                res.status(200).json({
                    "RezervasyonYapilabilir":true,
                    "YerlesimAyrinti":yerlesimAyrinti
                });
            }
            else{
                res.status(200).json({
                    "RezervasyonYapilabilir":false,
                    "YerlesimAyrinti":[]
                });
            }
        }
        else{
            //rezervasyon yok
            res.status(200).json({
                "RezervasyonYapilabilir":false,
                "YerlesimAyrinti":[]
            });
        }
    }
    
}
