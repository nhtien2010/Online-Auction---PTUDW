
const db = require('../utils/db');

module.exports = {
    all: _ => (db.select('select * from category')),
    id: id => db.select(`select * from category where category.id = ${id}`),
    getById: async id => {
        const row = await db.select( `select * from category where category.id = ${id}`);
        if(row.length === 0)
            return null;
        return row[0];
    },
    insert: entity => db.insert(entity, 'category'),
    delete: catid => db.delete({id: catid}, 'category'),
    update: entity => {
        const condition = {id: entity.id};
        delete entity.id;
        return db.update(entity, condition, 'category');
    },
    isParent: async catid => {
        const row = await db.select(`select * from category where parent = ${catid}`);
        if(row.length === 0)
            return false;
        return true;
    }
};