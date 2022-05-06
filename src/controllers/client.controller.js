const clientData = require('../data/clients/index');

const getAllClients = async (req, res, next) => {
    try {

        const clientlist = await clientData.getAllClients();
        res.send(clientlist);        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getClient = async (req, res, next) => {
    try {
        const clientId = req.params.id;
        const client = await clientData.getById(clientId);
        res.send(client);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const addClient = async (req, res, next) => {
    try {
        const data = req.body;
        const insert = await clientData.createClient(data);
        res.send(insert);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateClient = async (req, res, next) => {
    try {
        const clientId =  req.params.id;
        const data = req.body;
        const updated = await clientData.updateClient(clientId, data);
        res.send(updated);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteClient = async (req, res, next) => {
    try {
        const clientId = req.params.id;
        const deletedClient = await clientData.deleteClient(clientId);
        res.send(deletedClient);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getAllClients,
    getClient,
    addClient,
    updateClient,
    deleteClient
}