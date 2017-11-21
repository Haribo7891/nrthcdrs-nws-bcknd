const router = require('express').Router();
const { getUserInfo } = require('../controllers/users');

router.route('/:username')
  .get(getUserInfo);

module.exports = router;
