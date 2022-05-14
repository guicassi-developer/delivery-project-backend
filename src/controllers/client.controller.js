const log = require('../controllers/logs.controller');

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
        log.addLog({
            idLog: `ADD_CLIENT_${data.cpf.toString().slice(0,3)}_${data.nrPhone.toString().slice(-4)}_${new Date().getTime()}`,
            message: `Cliente ${data.firstName} adicionado`,
            type: 1,
            dateTime: new Date()
        });
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
        log.addLog({
            idLog: `UPDATE_CLIENT_${data.cpf.toString().slice(0,3)}_${data.nrPhone.toString().slice(-4)}_${new Date().getTime()}`,
            message: `Cliente ${data.firstName} atualizado`,
            type: 2,
            dateTime: new Date()
        });
        res.send(updated);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteClient = async (req, res, next) => {
    try {
        const clientId = req.params.id;
        const client = await clientData.getById(clientId);
        if(client.length > 0) {
            const data = client[0];
            const deletedClient = await clientData.deleteClient(clientId);
            log.addLog({
                idLog: `DELETE_CLIENT_${data.CPF.toString().slice(0,3)}_${data.NR_PHONE.toString().slice(-4)}_${new Date().getTime()}`,
                message: `Cliente ${client[0].FIRST_NAME} excluido`,
                type: 3,
                dateTime: new Date()
            });
            res.send(deletedClient);
        }
        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const login = async (req, res, next) => {
    try {
        const data = req.body;
        const result = await clientData.login(data);
        res.send(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getAllClients,
    getClient,
    addClient,
    updateClient,
    deleteClient,
    login
}