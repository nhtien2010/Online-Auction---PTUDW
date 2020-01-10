
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
  getType: type => (db.select(`select * from user where type = '${type}'`)),
  changeType: entity => {
    const condition = { id: entity.id };
    delete entity.id;
    return db.update(entity, condition, 'user');
  },
  delete: userid => db.delete({ id: userid }, 'user'),
  refresh: _ => db.refresh(),
  getReqBidder: _ => (db.select(`select * from user where request='request'`)),
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
  rate: entity => db.rate(entity),
  userratinglist: id => db.select(`select distinct first.name as username, rating.rating, second.name as ratorname, rating.comment from rating, user first, user second where rating.user=${id} and rating.rator=second.id and first.id=${id}`),
  bidderratinglist: id => db.select(`select distinct first.name as username, rating.rating, second.name as ratorname, rating.comment from history, rating, user first, user second where history.product=${id} and rating.user=history.user and rating.rator=second.id and first.id=history.user order by username`)
};