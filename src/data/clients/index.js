const config = require('../../config');
const sql = require('mssql');

const getAllClients = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const query = `SELECT * FROM TB_CLIENT_INFO`;
        const clientsList = await pool.request().query(query);
        return clientsList.recordset;
    } catch (error) {
        console.log(error.message);
    }
}

const getById = async(clientId) => {
    try {
        let pool = await sql.connect(config.sql);
        const query = `SELECT * FROM TB_CLIENT_INFO WHERE ID_CLIENT = @clientId`;
        const client = await pool.request()
                            .input('clientId', sql.Int, clientId)
                            .query(query);
        return client.recordset;
    } catch (error) {
        return error.message;
    }
}

const createClient = async (clientdata) => {
    try {
        let pool = await sql.connect(config.sql);
        const query = `INSERT INTO 
            TB_CLIENT_INFO (
                FIRST_NAME,
                SURNAME,
                DATE_NASC,
                EMAIL,
                PASSWORD,
                CPF,
                NR_PHONE
            )
            VALUES (
                @firstName,
                @surname,
                @dateNasc,
                @email,
                @password,
                @cpf,
                @nrPhone
            )`;

        const insertclient = await pool.request()
                            .input('firstName', sql.NVarChar(50), clientdata.firstName)
                            .input('surname', sql.NVarChar(50), clientdata.surname)
                            .input('dateNasc', sql.DateTime, new Date(clientdata.dateNasc))
                            .input('email', sql.NVarChar(50), clientdata.email)
                            .input('password', sql.NVarChar(50), clientdata.password)
                            .input('cpf', sql.Numeric, clientdata.cpf)
                            .input('nrPhone', sql.Numeric, clientdata.nrPhone)
                            .query(query);                            
        return insertclient.recordset;
    } catch (error) {
        return error.message;
    }
}

const updateClient = async (clientId, data) => {
    try {
        let pool = await sql.connect(config.sql);
        const query = `UPDATE TB_CLIENT_INFO
            SET FIRST_NAME=@firstName,
                SURNAME=@surname,
                DATE_NASC=@dateNasc,
                EMAIL=@email,
                PASSWORD=@password,
                NR_PHONE=@cpf,
                CPF=@nrPhone
            WHERE ID_CLIENT=@clientId`;
            
        const update = await pool.request()
                        .input('firstName', sql.NVarChar(50), clientdata.firstName)
                        .input('surname', sql.NVarChar(50), clientdata.surname)
                        .input('dateNasc', sql.DateTime, new Date(clientdata.dateNasc))
                        .input('email', sql.NVarChar(50), clientdata.email)
                        .input('password', sql.NVarChar(50), clientdata.password)
                        .input('cpf', sql.Numeric, clientdata.cpf)
                        .input('nrPhone', sql.Numeric, clientdata.nrPhone)
                        .query(query);  
        return update.recordset;
    } catch (error) {
        return error.message;
    }
}

const deleteClient = async (clientId) => {
    try {
        let pool = await sql.connect(config.sql);
        const query = `DELETE TB_CLIENT_INFO
            WHERE ID_CLIENT=@clientId`;
        const deleteclient = await pool.request()
                            .input('clientId', sql.Int, clientId)
                            .query(query);
        return deleteclient.recordset;
    } catch (error) {
        return error.message;
    }
}

module.exports = {
    getAllClients,
    getById,
    createClient,
    updateClient,
    deleteClient
}