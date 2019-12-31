const db = require('../utils/db');

module.exports = {
    all: _ => (db.select('select * from category')),
    id: id => db.select(`select * from category where category.id = ${id}`)
};