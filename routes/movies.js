const router = require('express').Router(); // импорт express router

const { getCardsMovies, createCardMovie, deleteCardMovie } = require('../controllers/movies'); // импорт контроллеров
const { createCardMovieValidator, deleteCardMovieValidator } = require('./validators/movieValidator'); // импорт валидаторов

router.get('/', getCardsMovies); // GET запрос, возвращает все сохранённые текущим  пользователем фильмы
router.post('/', createCardMovieValidator, createCardMovie); // POST запрос, создаёт фильм с переданными в теле country, director, duration, year....
router.delete('/:cardId', deleteCardMovieValidator, deleteCardMovie); // DELETE запрос, удаляет сохранённый фильм по id

module.exports = router; // экспорт роута
