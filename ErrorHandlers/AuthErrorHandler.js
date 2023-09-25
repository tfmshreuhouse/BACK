const errorModelUser = (err) => {
    let arrayErrores = [];

    try {
        //console.log(err.errors[0]);
        err.errors.map(error => {
            //console.error(error);
            arrayErrores.push({ message: error.message });
        });
        return arrayErrores;
    } catch (error) {
        arrayErrores.push({ message: "errorModel0" });
        return arrayErrores;
    }
};

module.exports = { errorModelUser };