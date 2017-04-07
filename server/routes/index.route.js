"use strict";

var router     = require('express').Router();
var controller = require('C:/Nodejs/server/controllers/index.controller');

router.get('/', (req, res) => {
	res.status(201);	// 201 - Webpage created
	controller.reserve();	// Let's fetch some data from guardian API
});

module.exports = router;