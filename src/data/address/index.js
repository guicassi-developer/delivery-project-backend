const config = require('../../config');
const sql = require('mssql');

const getById = async(addressId) => {
    try {
        let pool = await sql.connect(config.sql);
        const query = `SELECT * FROM TB_ADDRESS WHERE ID_ADDRESS = @addressId`;
        const address = await pool.request()
                            .input('addressId', sql.Int, addressId)
                            .query(query);
        return address.recordset;
    } catch (error) {
        return error.message;
    }
}

module.exports = {
    getById
}