const express = require('express');
const clientControll = require('../controllers/client.controller');
const router = express.Router();

router.get('/all', clientControll.getAllClients);
router.get('/:id', clientControll.getClient);
router.post('', clientControll.addClient);
router.put('/:id', clientControll.updateClient);
router.delete('/:id', clientControll.deleteClient);
router.post('/login', clientControll.login);


module.exports = {
    routes: router
}