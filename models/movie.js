// Создать схему и модель ресурсов API для movies

const mongoose = require('mongoose'); // импорт mongoose
const validator = require('validator'); // импорт валидаторов

const movieSchema = new mongoose.Schema({
  country: {
    type: String, // строка
    required: [true, 'Нужно указать страну создания фильма'], // обязательное поле
  },
  director: {
    type: String, // строка
    required: [true, 'Нужно указать режиссёра фильма'], // обязательное поле
  },
  duration: {
    type: Number, // число
    required: [true, 'Нужно указать длительность фильма'], // обязательное поле
  },
  year: {
    type: String, // строка
    required: [true, 'Нужно указать год создания фильма'], // обязательное поле
  },
  description: {
    type: String, // строка
    required: [true, 'Нужно указать описание фильма'], // обязательное поле
  },
  image: {
    type: String, // строка
    required: [true, 'Нужно указать ссылку на постер фильма'],
    validate: { // validator — функция проверки данных. v — значение свойства email
      validator: (v) => validator.isURL(v),
      message: 'Неправильный формат ссылки',
    },
  },
  trailerLink: {
    type: String, // строка
    required: [true, 'Нужно указать ссылку на трейлер фильма'],
    validate: { // validator — функция проверки данных. v — значение свойства email
      validator: (v) => validator.isURL(v),
      message: 'Неправильный формат ссылки',
    },
  },
  thumbnail: {
    type: String, // строка
    required: [true, 'Нужно указать ссылку на миниатюрное изображение постера к фильму'],
    validate: { // validator — функция проверки данных. v — значение свойства email
      validator: (v) => validator.isURL(v),
      message: 'Неправильный формат ссылки',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Нужно указать _id пользователя, который сохранил фильм'],
  },
  movieId: {
    type: Number, // число
    required: [true, 'Нужно указать id фильма'],
  },
  nameRU: {
    type: String, // строка
    required: [true, 'Нужно указать название фильма на русском языке'],
  },
  nameEN: {
    type: String, // строка
    required: [true, 'Нужно указать название фильма на английском языке'],
  },
}, { versionKey: false });

// создать модель и экспортировать
module.exports = mongoose.model('movie', movieSchema);
