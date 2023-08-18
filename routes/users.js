const router = require('express').Router(); // импорт express router

const { getUserInfo, updateUserInfo } = require('../controllers/users'); // импорт контроллеров
const { updateUserValidator } = require('./validators/userValidator'); // импорт валидатора

router.get('/me', getUserInfo); // GET запрос, возвращает информацию о пользователе (email и имя)
router.patch('/me', updateUserValidator, updateUserInfo); // PATCH запрос, обновляет информацию о пользователе (email и имя)

module.exports = router; // экспорт роута
