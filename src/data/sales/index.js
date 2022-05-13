const config = require('../../config');
const sql = require('mssql');

const getById = async(saleId) => {
    try {
        let pool = await sql.connect(config.sql);
        const query = `SELECT * FROM TB_SALES WHERE ID_SALE = @saleId`;
        const sale = await pool.request()
                            .input('saleId', sql.Int, saleId)
                            .query(query);
        return sale.recordset;
    } catch (error) {
        return error.message;
    }
}

module.exports = {
    getById
}