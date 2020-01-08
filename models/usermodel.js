const db = require('../utils/db');

module.exports = {
    id: id => db.select(`select * from user where id=${id}`),
    add: entity => db.insert(entity, 'user'),
    check: email => db.select(`select * from user where email='${email}'`),
    update: (entity, condition) => db.update(entity, condition, 'user'),
    otp: (entity) => db.insert(entity, 'otp'),
    verify: (email) => db.select(`select * from otp where email='${email}' order by otp.start desc limit 1`),
    bid: (entity) => {db.insert(entity, 'history'), db.UpdateHistory(entity)},
    automated: (entity) => db.insert(entity, 'automation')
};