"use strict";

var router     = require('express').Router();
var controller = require('C:/Nodejs/server/controllers/news.controller');

router.get('/', controller.get);
router.get('/latest', controller.getLatest);
router.get('/:section', controller.getSection);

module.exports = router;