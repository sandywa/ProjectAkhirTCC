const mysql = require('mysql')

const db = mysql.createPool({
    host: '192.168.60.128',
    user: 'root',
    password: '123190145',
    database: 'projecttcc',
    port: '/var/run/mysqld/mysqld.sock'
})

exports.db = db;