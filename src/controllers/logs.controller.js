const logData = require('../data/logs/index');

async function addLog(data) {
    try {
        return await logData.createLog(data);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addLog
}