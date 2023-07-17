import Joi from "joi";

const schemaPurchase = Joi.object({
  buyerInfo: Joi.string().email().required(),
  productInfo: Joi.array()
    .items(
      Joi.object({
        id: Joi.string().required(),
        size: Joi.string().valid(
          "s",
          "m",
          "l",
          "xl",
          "xxl",
          "s36",
          "s37",
          "s38",
          "s39",
          "s40",
          "s41",
          "s42",
          "s43"
        ),
        quantity: Joi.number().greater(0).required(),
      })
    )
    .required(),
  addressInfo: {
    address: Joi.string().max(35).required(),
    district: Joi.string().max(35).required(),
    zipCode: Joi.string().max(9).required(),
    complement: Joi.string().max(35).min(0),
    city: Joi.string().max(35).required(),
    state: Joi.string().length(2).required(),
  },
  paymentInfo: {
    number: Joi.string().length(19).required(),
    expiry: Joi.string().length(5).required(),
    cvc: Joi.string().length(3).required(),
    name: Joi.string().min(5).required(),
  },
});

export default schemaPurchase;
