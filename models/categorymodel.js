const db = require('../utils/db');

module.exports = {
    all: _ => (db.select('select * from category')),
    id: id => db.select(`select * from category where category.id = ${id}`),
    getById: async id => {
        const row = await db.select( `select * from category where id = ${id}`);
        if(row.length === 0)
        return null;
        return row[0];
    },
    insert: entity => db.insert(entity, 'category'),
};
