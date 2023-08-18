const { ValidationError, DocumentNotFoundError, CastError } = require('mongoose').Error; // Импорт классов ошибок из mongoose

const Movie = require('../models/movie'); // импорт модели Movie

const { CREATED } = require('../utils/constants'); // импорт статус кода 201
const {
  VALIDATION_ERR_MESSAGE,
  MOVIE_DELETE_MESSAGE,
  MOVIE_FORBIDDEN_ERR_MESSAGE,
  MOVIE_FIND_NOT_FOUND_ERR_MESSAGE,
  MOVIE_BAD_REQUEST_ERR_ID_MESSAGE
} = require('../utils/constants'); // импорт message

const NotFoundError = require('../errors/notFoundError'); // импорт класса ошибки 404
const BadRequestError = require('../errors/badRequestError'); // импорт класса ошибки 400
const ForbiddenError = require('../errors/forbiddenError'); // импорт класса ошибки 403

// Ф-ция, возвращающая сохраненные фильмы
const getCardsMovies = (req, res, next) => {
  const { _id: userId } = req.user;
  Movie.find({ owner: userId })
    .populate(['owner']) // Получаем всю информацию
    .then((cards) => res.send(cards))
    .catch(next);
};

// Ф-ция, создающая фильм
const createCardMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner
  })
    .then((card) => card.populate('owner'))
    .then((card) => res.status(CREATED).send(card))
    .catch((err) => {
      if (err instanceof ValidationError) {
        const errMessage = Object.values(err.errors)
          .map((error) => error.message)
          .join(' ');
        next(new BadRequestError(`${VALIDATION_ERR_MESSAGE} ${errMessage}`));
      } else {
        next(err);
      }
    });
};

// Ф-ция, удаляющая карточку по id
const deleteCardMovie = (req, res, next) => {
  Movie.findById(req.params.cardId)
    .orFail()
    .then((card) => {
      const owner = card.owner.toString();
      if (req.user._id === owner) {
        card.deleteOne()
          .then(() => res.send({ message: MOVIE_DELETE_MESSAGE }))
          .catch(next);
      } else {
        next(new ForbiddenError(MOVIE_FORBIDDEN_ERR_MESSAGE));
      }
    })
    .catch((err) => {
      if (err instanceof DocumentNotFoundError) {
        next(new NotFoundError(MOVIE_FIND_NOT_FOUND_ERR_MESSAGE));
      } else if (err instanceof CastError) {
        next(new BadRequestError(`${MOVIE_BAD_REQUEST_ERR_ID_MESSAGE} ${req.params.cardId}`));
      } else {
        next(err);
      }
    });
};

// экспорт контроллеров в routes movie
module.exports = {
  getCardsMovies,
  createCardMovie,
  deleteCardMovie,
};
