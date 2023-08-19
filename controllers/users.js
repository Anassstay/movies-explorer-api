const { ValidationError, CastError, DocumentNotFoundError } = require('mongoose').Error; // Импорт классов ошибок из mongoose

const jwt = require('jsonwebtoken'); // импорт jsonwebtoken
const bcrypt = require('bcryptjs'); // импорт bcrypt
const User = require('../models/user'); // импорт модели User

const { CREATED } = require('../utils/constants'); // импорт статус кода 201

const ConflictError = require('../errors/conflictError'); // импорт класса ошибки 409
const NotFoundError = require('../errors/notFoundError'); // импорт класса ошибки 404
const BadRequestError = require('../errors/badRequestError'); // импорт класса ошибки 400
const UnauthorizedError = require('../errors/unauthorizedError'); // импорт класса ошибки 401

const { JWT_SECRET } = require('../utils/config'); // импорт секретного ключа

const JWT_SECRET_PROD = process.env.REACT_APP_JWT_SECRET;
const { NODE_ENV } = process.env;

const {
  USER_NOT_FOUND_ERR_MESSAGE,
  USER_CONFLICT_ERR_MESSAGE,
  USER_BAD_REQUEST_ERR_ID_MESSAGE,
  AUTHORIZATION_ERR_MESSAGE,
  VALIDATION_ERR_MESSAGE,
  LOGIN_MESSAGE,
  LOGOUT_MESSAGE
} = require('../utils/constants'); // импорт message

// Ф-ция, возвращающая инфо о юзере - email и name
const getUserInfo = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId) // записываем данные в базу
    .then((user) => res.send(user)) // возвращаем записанные в базу данные пользователю
    // если данные не записались, вернём ошибку
    .catch((err) => {
      if (err instanceof DocumentNotFoundError) {
        next(new NotFoundError(USER_NOT_FOUND_ERR_MESSAGE));
      } else {
        next(err);
      }
    });
};

// Ф-ция регистрации, для создания пользователя
const createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  // console.log(email, password, name);
  bcrypt.hash(password, 10) // хешировать пароль
    .then((hash) => User.create({
      email, password: hash, name, // записать хеш в базу
    }))
    // вернуть записанные в базу данные
    .then((user) => {
      const data = user.toObject();
      delete data.password;
      // создать токен
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET_PROD : JWT_SECRET,
        { expiresIn: '7d' }
      );
      res.cookie('jwt', token, {
        // domain: 'diploma.api.a.stay.nomoredomains.rocks',
        // path: '/',
        // такая кука будет храниться 7 дней
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        // защита от автоматической отправки кук
        // указать браузеру, чтобы тот посылал куки, только если запрос сделан с того же домена
        sameSite: 'none',
        secure: true,
      });
      res.status(CREATED).send(data);
      // console.log(data);
    })
    // если данных нет, вернуть ошибку
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(USER_CONFLICT_ERR_MESSAGE));
        return;
      }
      if (err instanceof ValidationError) {
        const errMessage = Object.values(err.errors)
          .map((error) => error.message)
          .join(', ');
        next(new BadRequestError(`${USER_BAD_REQUEST_ERR_ID_MESSAGE} ${errMessage}`));
      } else {
        next(err);
      }
    });
};

// Ф-ция, обновления данных пользователя
const updateUserInfo = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(req.user._id, { email, name }, { new: true, runValidators: true })
    .orFail()
    .then((user) => {
      if (!user) {
        throw new NotFoundError(USER_NOT_FOUND_ERR_MESSAGE);
      }
      res.send(user);
    })
    .catch((err) => {
      if (err instanceof ValidationError) {
        const errMessage = Object.values(err.errors)
          .map((error) => error.message)
          .join(', ');
        next(new BadRequestError(`${VALIDATION_ERR_MESSAGE} ${errMessage}`));
        return;
      }
      if (err instanceof CastError) {
        next(new BadRequestError(USER_BAD_REQUEST_ERR_ID_MESSAGE));
      } else {
        next(err);
      }
    });
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedError(AUTHORIZATION_ERR_MESSAGE);
    }
    // создать токен
    const token = jwt.sign(
      { _id: user._id },
      NODE_ENV === 'production' ? JWT_SECRET_PROD : JWT_SECRET,
      { expiresIn: '7d' }
    );
    res.cookie('jwt', token, {
      // domain: 'diploma.api.a.stay.nomoredomains.rocks',
      // path: '/',
      // такая кука будет храниться 7 дней
      maxAge: 3600000 * 24 * 7,
      httpOnly: true,
      // защита от автоматической отправки кук
      // указать браузеру, чтобы тот посылал куки, только если запрос сделан с того же домена
      sameSite: 'none',
      secure: true,
    });
    res.send({ message: LOGIN_MESSAGE });
  } catch (err) { next(err); }
};

const logout = async (req, res, next) => {
  try {
    res.clearCookie('jwt', {
      // domain: 'diploma.api.a.stay.nomoredomains.rocks',
      path: '/',
      sameSite: 'none',
      secure: true,
    }).send({ message: LOGOUT_MESSAGE });
  } catch (err) { next(err); }
};

// экспорт контроллеров в routes movie, index
module.exports = {
  getUserInfo,
  createUser,
  updateUserInfo,
  login,
  logout,
};
