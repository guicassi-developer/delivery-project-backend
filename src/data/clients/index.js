const config = require('../../config');
const sql = require('mssql');
const bcrypt = require('bcrypt');

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

        const clientExist = await pool.request()
                            .input('email', sql.NVarChar(50), clientdata.email)
                            .query(`SELECT * FROM TB_CLIENT_INFO WHERE EMAIL = @email`);

        if (clientExist.recordset.length === 0) {
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

            const hashedPassword = await bcrypt.hash(clientdata.password, 10);

            const insertclient = await pool.request()
                                .input('firstName', sql.NVarChar(50), clientdata.firstName)
                                .input('surname', sql.NVarChar(50), clientdata.surname)
                                .input('dateNasc', sql.DateTime, new Date(clientdata.dateNasc))
                                .input('email', sql.NVarChar(50), clientdata.email)
                                .input('password', sql.NVarChar(200), hashedPassword)
                                .input('cpf', sql.Numeric, clientdata.cpf)
                                .input('nrPhone', sql.Numeric, clientdata.nrPhone)
                                .query(query);                            
            return insertclient.recordset;
        } else {
            throw new Error('Email already used');
        }
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

const login = async (clientData) => {
    try {
        let pool = await sql.connect(config.sql);
        const query = `SELECT * FROM TB_CLIENT_INFO
            WHERE EMAIL=@email`;

        const client = await pool.request()
            .input('email', sql.NVarChar(50), clientData.email)
            .query(query);
        
        if (client.recordset.length) {
            const vPass = await bcrypt.compare(clientData.password, client.recordset[0].PASSWORD);
            const vEmail = client.recordset[0].EMAIL === clientData.email;

            if (vPass && vEmail) {
                return 'login successfully';
            } else {
                throw new Error('Credenciais Invalidas!');
            }
        } else {
            throw new Error('Email nao cadastrado!');
        }

    } catch(err) {
        return err.message;
    }
}



module.exports = {
    getAllClients,
    getById,
    createClient,
    updateClient,
    deleteClient,
    login
}