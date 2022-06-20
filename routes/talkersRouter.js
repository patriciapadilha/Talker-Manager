const router = require('express').Router();
const services = require('../services/talkersService');

router.get('/talker', services.getTalkers);

module.exports = router;