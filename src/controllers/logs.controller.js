const logData = require('../data/logs/index');

async function addLog(data) {
    try {
        const insert = await logData.createLog(data);
        res.send(insert);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addLog
}