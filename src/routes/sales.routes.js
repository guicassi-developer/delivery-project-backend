const express = require('express');
const salesControll = require('../controllers/sales.controller');
const router = express.Router();

router.get('/:id', salesControll.getSale);

module.exports = {
    routes: router
}