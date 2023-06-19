const rateLimit = require('express-rate-limit'); // импорт express-rate-limit
// (защита от автоматических запросов, огранич кол-во запросов с одного IP-адреса в ед. времени)

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // за 15 минут
  max: 100 // можно совершить максимум 100 запросов с одного IP
});

module.exports = limiter;
