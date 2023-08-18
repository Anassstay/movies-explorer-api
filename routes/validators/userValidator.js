const { celebrate, Joi } = require('celebrate');

const createUserValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
  }),
});

const loginUserValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const updateUserValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
  }),
});

// экспорт валидаторов в routes users, index
module.exports = {
  createUserValidator,
  loginUserValidator,
  updateUserValidator,
};
