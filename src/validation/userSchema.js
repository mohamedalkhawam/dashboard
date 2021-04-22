import Joi from '@hapi/joi';

export const creteSchema = Joi.object().keys({
  firstName: Joi.string()
    .min(3)
    .required()
    .messages({
      'string.base': `First Name should be a type of 'text'`,
      'string.empty': `First Name cannot be an empty field`,
      'string.min': `First Name should have a minimum length of {#limit}`,
      'string.max': `First Name should have a maximum length of {#limit}`,
      'any.required': `First Name is a required field`,
    }),
  lastName: Joi.string()
    .min(3)
    .required()
    .messages({
      'string.base': `Last Name should be a type of 'text'`,
      'string.empty': `Last Name cannot be an empty field`,
      'string.min': `Last Name should have a minimum length of {#limit}`,
      'string.max': `Last Name should have a maximum length of {#limit}`,
      'any.required': `Last Name is a required field`,
    }),
  email: Joi.string()
    .min(6)
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.empty': `Email cannot be an empty field`,
      'string.min': `Email should have a minimum length of {#limit}`,
      'any.required': `Email is a required field`,
    }),
  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.empty': `Password cannot be an empty field`,
      'string.min': `Password should have a minimum length of {#limit}`,
      'any.required': `Password is a required field`,
    }),
  passwordConfirmation: Joi.any()
    .equal(Joi.ref('password'))
    .required(),
});

export const editSchema = Joi.object().keys({
  firstName: Joi.string()
    .min(3)
    .max(21)
    .required()
    .messages({
      'string.base': `First Name should be a type of 'text'`,
      'string.empty': `First Name cannot be an empty field`,
      'string.min': `First Name should have a minimum length of {#limit}`,
      'string.max': `First Name should have a maximum length of {#limit}`,
      'any.required': `First Name is a required field`,
    }),
  lastName: Joi.string()
    .min(3)
    .max(21)
    .required()
    .messages({
      'string.base': `Last Name should be a type of 'text'`,
      'string.empty': `Last Name cannot be an empty field`,
      'string.min': `Last Name should have a minimum length of {#limit}`,
      'string.max': `Last Name should have a maximum length of {#limit}`,
      'any.required': `Last Name is a required field`,
    }),
  email: Joi.string()
    .min(6)
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.empty': `Email cannot be an empty field`,
      'string.min': `Email should have a minimum length of {#limit}`,
      'any.required': `Email is a required field`,
    }),
});
export const validator = (schema, values, setValues) => {
  const valid = schema.validate(values, { abortEarly: false });
  const newErrorObject = {};
  if (valid.error) {
    valid.error.details.forEach((err) => {
      newErrorObject[err.path.join('.')] = err.message.includes('ref:password')
        ? 'password and password Confirmation must be same'
        : err.message;
    });
  }
  setValues({ ...newErrorObject });
};
