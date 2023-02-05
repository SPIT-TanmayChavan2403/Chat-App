class HelperFunc{
    constructor(){}

    extractError(errObj){
        console.log("ERROR", errObj);
        if (errObj.code == 11000){
            return `${Object.keys(errObj.keyPattern)[0]} is already in use`;
        }
    }
}

module.exports = HelperFunc;