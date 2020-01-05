const db = require('../utils/db');

module.exports = {
    id: id => db.select(`select * from user where id=${id}`),
    add: entity => db.insert(entity, 'user'),
    check: email => db.select(`select * from user where email='${email}'`)
};