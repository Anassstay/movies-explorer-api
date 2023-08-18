const OK = 200;
const CREATED = 201;
const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const FORBIDDEN = 403;
const NOT_FOUND = 404;
const CONFLICT = 409;
const SERVER_ERROR = 500;

const VALIDATION_ERR_MESSAGE = 'Переданы некорректные данные при создании:';
const MOVIE_DELETE_MESSAGE = 'Фильм успешно удалён';
const MOVIE_FORBIDDEN_ERR_MESSAGE = 'Можно удалять только те фильмы, которые добавил ты';
const MOVIE_FIND_NOT_FOUND_ERR_MESSAGE = 'Фильм не найден';
const MOVIE_BAD_REQUEST_ERR_ID_MESSAGE = 'Передан некорректный id фильма';

const NOT_FOUND_ERR_MESSAGE = 'Пользователь с таким id не найден';
const USER_CONFLICT_ERR_MESSAGE = 'Пользователь с таким email уже есть';
const USER_BAD_REQUEST_ERR_ID_MESSAGE = 'Передан некорректный id пользователя';

const AUTHORIZATION_ERR_MESSAGE = 'Неправильный логин или пароль';
const LOGIN_MESSAGE = 'Вы успешно вошли в систему';
const LOGOUT_MESSAGE = 'Вы вышли из системы';

const UNAUTH_MESSAGE = 'Необходима авторизация';

module.exports = {
  OK,
  CREATED,
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  NOT_FOUND,
  CONFLICT,
  SERVER_ERROR,
  VALIDATION_ERR_MESSAGE,
  MOVIE_DELETE_MESSAGE,
  MOVIE_FORBIDDEN_ERR_MESSAGE,
  MOVIE_FIND_NOT_FOUND_ERR_MESSAGE,
  MOVIE_BAD_REQUEST_ERR_ID_MESSAGE,
  NOT_FOUND_ERR_MESSAGE,
  USER_CONFLICT_ERR_MESSAGE,
  USER_BAD_REQUEST_ERR_ID_MESSAGE,
  AUTHORIZATION_ERR_MESSAGE,
  LOGIN_MESSAGE,
  LOGOUT_MESSAGE,
  UNAUTH_MESSAGE,
};
