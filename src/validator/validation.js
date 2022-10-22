//Validations
const Joi = require('@hapi/joi');

//Registration validation
const registrationValidation = data => {
    const schema = {
        name: Joi.string().min(3).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
        number: Joi.number().required(),
    };
    return Joi.validate(data, schema);
}

//Login validation
const loginValidation = data => {
    const schema = {
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
    };
    return Joi.validate(data, schema);
}

module.exports.registrationValidation = registrationValidation;
module.exports.loginValidation = loginValidation;