import Joi from "joi"
export const productSchema = Joi.object({
  name:            Joi.string().required(),
  price:           Joi.number().required(),
  stock:           Joi.number().required(),
  description:     Joi.string().allow(''),
  category:        Joi.string().allow(''),
  manufactureDate: Joi.string().required(),
  image:           Joi.string().pattern(/^\/uploads\/.+\.(jpg|jpeg|png|gif|webp)$/).required(),
});



export default productSchema