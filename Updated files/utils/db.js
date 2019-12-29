const mysql = require('mysql');
const util = require('util');

const pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Fallenzerd4',
    database: 'auction'
});

const pool_query = util.promisify(pool.query).bind(pool);

module.exports = {
    select: sql => pool_query(sql),
    refresh: _ => pool_query('call Refresh()'),
    insert: (entity, table) => pool_query(`insert into ${table} set ?`, entity),
    delete: (condition, table) => pool_query(`delete from ${table} where ?`, condition),
    update: (entity, condition, table) => pool_query(`update ${table} set ? where ?`, [entity, condition]),
  };