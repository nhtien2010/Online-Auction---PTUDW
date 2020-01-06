const db = require('../utils/db');

module.exports = {
    id: id => db.select(`select * from user where id=${id}`),
    add: entity => db.insert(entity, 'user'),
    check: email => db.select(`select * from user where email='${email}'`),
    update: (entity, condition) => db.update(entity, condition, 'user'),
    singleByUserName: async username => {
        const rows = await db.load(`select * from user where username = '${username}'`);
        if (rows.length > 0)
          return rows[0];
    
        return null;
      }
};