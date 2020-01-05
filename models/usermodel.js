const db = require('../utils/db');

module.exports = {
    id: id => db.select(`select * from user where id=${id}`),
    add: entity => db.insert(entity, 'new_table')
};