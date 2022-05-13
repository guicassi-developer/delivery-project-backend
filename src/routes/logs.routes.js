const express = require('express');
const logsControll = require('../controllers/logs.controller');
const router = express.Router();

router.get('', logsControll.createLog);

module.exports = {
    routes: router
}