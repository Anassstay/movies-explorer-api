require('dotenv').config(); // импорт dotenv для добавления переменных окружения в process.env

const express = require('express'); // импорт express router
const mongoose = require('mongoose'); // импорт mongoose

// Подключить миддлвэры
const cookieParser = require('cookie-parser'); // импорт cookie-parser
const validationErrors = require('celebrate').errors; // импорт celebrate
const helmet = require('helmet'); // импорт helmet (заголовки безопасности можно проставлять автоматически)
const corsModule = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger'); // импорт миддлвэров для логирования запросов и ошибок
const errors = require('./middlewares/errors'); // импорт централизованного обработчика ошибок
const limiter = require('./middlewares/limiter');
const cors = require('./middlewares/cors');

const router = require('./routes/index'); // импорт роутов

const { PORT = 3000, DATABASE, NODE_ENV } = process.env;
const { DEFAULT_DATABASE } = require('./utils/config');

const app = express(); // создать приложение методом express

// Подключить приложение к cерверу mongo
mongoose.connect(NODE_ENV === 'production' ? DATABASE : DEFAULT_DATABASE, {
  useNewUrlParser: true,
  Family: 4
})
  .then(() => console.log('connect in DB is OK'))
  .catch(console.log);

app.use(corsModule({
  origin: true,
  credentials: true
}));

app.use(cors);

app.use(express.json()); // для сборки JSON-формата
app.use(cookieParser()); // подключить парсер кук как мидлвэр
app.use(helmet()); // безопасность
app.use(requestLogger); // логгер запросов
app.use(limiter); // безопасность

app.use(router);

app.use(errorLogger); // логгер ошибок
app.use(validationErrors()); // обработчик ошибок celebrate
app.use(errors); // централизованный обработчик ошибок

app.listen(PORT); // Слушать порт
