// Создать схему и модель ресурсов API для users

const mongoose = require('mongoose'); // импорт mongoose
// const bcrypt = require('bcryptjs'); // импорт bcrypt
const validator = require('validator'); // импорт валидаторов

// const UnauthorizedError = require('../errors/unauthorizedError'); // импорт классов ошибок

// Опишем схему:
const userSchema = new mongoose.Schema({
  email: {
    type: String, // email — это строка
    required: [true, 'Поле email должно быть заполнено'], // email — обязательное поле
    unique: true,
    validate: { // validator — функция проверки данных. v — значение свойства email
      validator: (v) => validator.isEmail(v),
      message: 'Неправильный формат почты',
    },
  },
  password: {
    type: String,
    required: [true, 'Поле password должно быть заполнено'], // пароль — обязательное поле
    minlength: 8,
    select: false, // по умолчанию хеш пароля пользователя не будет возвращаться из базы
  },
  name: {
    type: String,
    required: [true, 'Поле name должно быть заполнено'], // имя — обязательное поле
    minlength: [2, 'Длина должна быть не менее 2 символов'],
    maxlength: [30, 'Длина должна быть не более 30 символов'],
  },
}, {
  versionKey: false,

  // statics: {
  //   findUserByCredentials(email, password) {
  //     // попытка найти пользователя по почте
  //     return this.findOne({ email }).select('+password') // this — модель гser
  //       .then((user) => {
  //         if (!user) { // не нашёлся — отклонить промис
  //           throw new UnauthorizedError('Неправильная почта или пароль');
  //         }
  //         return bcrypt.compare(password, user.password) // нашёлся — сравнить хеши
  //           .then((matched) => {
  //             if (!matched) {
  //               throw new UnauthorizedError('Неправильная почта или пароль');
  //             }
  //             return user; // теперь user доступен
  //           });
  //       });
  //   },
  // },
});

// создать модель и экспортировать
module.exports = mongoose.model('user', userSchema);
