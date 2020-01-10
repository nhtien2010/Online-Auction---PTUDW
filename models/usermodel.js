
const db = require('../utils/db');

module.exports = {

    id: id => db.select(`select * from user where id=${id}`),
    add: entity => db.insert(entity, 'user'),
    check: email => db.select(`select * from user where email='${email}'`),
    update: (entity, condition) => db.update(entity, condition, 'user'),


    otp: (entity) => db.insert(entity, 'otp'),
    verify: (email) => db.select(`select * from otp where email='${email}' order by otp.start desc limit 1`),
    bid: async (entity) => { await db.insert(entity, 'history'); await db.UpdateHistory(entity) },
    automated: (entity) => db.insert(entity, 'automation'),

    all: _ => (db.select('select * from user')),
    getType: type  => (db.select( `select * from user where privilege = '${type}'`)),
    changeType: entity => {
        const condition = {id: entity.id};
        delete entity.id;
        return db.update(entity, condition, 'user');
    },
    delete: userid => db.delete({id: userid}, 'user'),
    refresh: _ => db.refresh(),
    getReqBidder: _ =>(db.select(`select * from user where request='upgrade'`)),
    singleByUserName: async username => {
      const rows = await db.load(`select * from user where username = '${username}'`);
      if (rows.length > 0)
        return rows[0];
  
      return null;
  },
  singleByEmail: async email => {
    const rows = await db.load(`select * from user where email = '${email}'`);
    if (rows.length > 0)
      return rows[0];

    return null;
  },
};