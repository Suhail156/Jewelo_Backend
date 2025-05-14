import Joi from "joi"

const userjoi = Joi.object({
name: Joi.string(),
  email: Joi.string(),
  number: Joi.string(),
  password: Joi.string(),
})
export default userjoi


 