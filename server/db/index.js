const mysql = require('mysql')
const db = mysql.createPool({
    host: '120.78.168.67',
    user: 'root',
    password: 'liji159.',
    database: 'api_server'
})

module.exports = db