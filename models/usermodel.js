const db = require('../utils/db');

module.exports = {
    id: id => db.select(`select * from user where id=${id}`),
    add: entity => db.insert(entity, 'new_table'),
    check: email => db.select(`select * from new_table where email='${email}'`)
};