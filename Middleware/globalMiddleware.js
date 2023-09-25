const middlewareValidateRequestFields = (headerToEval, requiredFields, message) => (req, res, next) => {

    const missingFields = requiredFields.filter(field => !req[headerToEval].hasOwnProperty(field));
        if (missingFields.length > 0) {
            return res.status(400).json({
                success: false,
                error: message
                //errors: message
            });
        }
        next();
};

const middlewareValidateRequestValues = (headerToEval, requiredValues, message) => (req, res, next) => {


    for (let i = 0; i < requiredValues.length; i++) {

        const value = requiredValues[i];

        if (req[headerToEval][value] === null || req[headerToEval][value] === undefined || req[headerToEval][value] === "") {
            return res.status(400).json({
                success: false,
                error: message
            });
        }
    }
    next();

}

module.exports = { middlewareValidateRequestFields, middlewareValidateRequestValues };