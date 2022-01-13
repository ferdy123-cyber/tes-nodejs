require('dotenv').config()

const {
    DB_HOST,
    DB_NAME,
    DB_PASS,
    DB_USER,
    DB_PORT,
    DB_DIALECT,
    DB_LOGGING
} = process.env;

const config = {
    dialect: DB_DIALECT,
    host: DB_HOST,
    port: parseInt(DB_PORT, 10),
    username: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    logging: DB_LOGGING,
    seedersStorage: 'sequelize',
    seedersStorageTableName: 'sequelizeData'
};

module.exports = config