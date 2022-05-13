const config = require('../../config');
const sql = require('mssql');

const getById = async(productId) => {
    try {
        let pool = await sql.connect(config.sql);
        const query = `SELECT * FROM TB_PRODUCTS WHERE ID_PRODUCT = @productId`;
        const product = await pool.request()
                            .input('productId', sql.Int, productId)
                            .query(query);
        return product.recordset;
    } catch (error) {
        return error.message;
    }
}

module.exports = {
    getById
}