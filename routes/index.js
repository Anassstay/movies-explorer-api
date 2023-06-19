const router = require('express').Router(); // импорт express router
const users = require('./users'); // импорт роутера users
const movies = require('./movies'); // импорт роутера movies
const auth = require('../middlewares/auth'); // импорт миддлвэра авторизации

const NotFoundError = require('../errors/notFoundError'); // импорт класса ошибки 404

const { createUser, login, logout } = require('../controllers/users'); // импорт контроллеров
const { createUserValidator, loginUserValidator } = require('./validators/userValidator'); // импорт валидаторов

// авторизация не нужна
router.post('/signup', createUserValidator, createUser); // роутер для регистрации, создаёт пользователя с переданными в теле email, password и name
router.post('/signin', loginUserValidator, login); // роутер для авторизации, проверяет переданные в теле почту и пароль и возвращает JWT

// авторизация нужна
router.use('/users', auth, users); // роутер для юзеров
router.use('/movies', auth, movies); // роутер для фильмов
router.get('/signout', auth, logout); // роутер для очищения куки при выходе

// для запросов по несуществующим URL
router.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router; // экспорт роутера в app.js
