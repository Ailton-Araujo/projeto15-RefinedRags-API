import Joi from "joi";

const schemaUser = Joi.object({
    fullName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(3),
    subscription: Joi.bool()
});

export default schemaUser;