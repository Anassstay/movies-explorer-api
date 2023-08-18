const { celebrate, Joi } = require('celebrate');

const createCardMovieValidator = celebrate({
  // тело запроса
  body: Joi.object().keys({
    country: Joi.string().required().trim(),
    director: Joi.string().required().trim(),
    duration: Joi.number().required(),
    year: Joi.string().required().trim(),
    description: Joi.string().required().trim(),
    image: Joi.string().required().uri().trim(),
    trailerLink: Joi.string().required().uri().trim(),
    thumbnail: Joi.string().required().uri().trim(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required().trim(),
    nameEN: Joi.string().required().trim(),
  }),
});

const deleteCardMovieValidator = celebrate({
  // параметры
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
});

// экспорт валидаторов в routes movies, index
module.exports = {
  createCardMovieValidator,
  deleteCardMovieValidator,
};
