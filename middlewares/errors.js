// Миддлвэр централизованной обработки ошибок
const { SERVER_ERROR } = require('../utils/constants');

const errors = (err, req, res, next) => {
  const { statusCode = 500, message } = err; // если у ошибки нет статуса, выставляем 500
  res
    .status(statusCode)
    .send({ // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === SERVER_ERROR
        ? 'Внутренняя ошибка сервера'
        : message,
    });
  next();
};

module.exports = errors;
