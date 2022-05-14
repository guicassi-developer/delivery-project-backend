const config = require('../../config');
const sql = require('mssql');

const createLog = async (logdata) => {
    try {
        let pool = await sql.connect(config.sql);
        const query = `INSERT INTO 
        TB_LOGS (
            ID_LOG,
            MESSAGE,
            TYPE,
            DATETIME
        )
        VALUES (
            @idLog,
            @message,
            @type,
            @dateTime
        )`;

        await pool.request()
            .input('idLog', sql.NVarChar(50), logdata.idLog)
            .input('message', sql.NVarChar(50), logdata.message)
            .input('type', sql.NVarChar(50), logdata.type)
            .input('dateTime', sql.DateTime, new Date(logdata.dateTime))
            .query(query);     
                                   
        return console.log('Log adicionado com sucesso!')

    } catch (error) {
        return error.message;
    }
}

module.exports = {
    createLog
}