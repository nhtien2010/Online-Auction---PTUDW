const db = require('../utils/db');

module.exports = {
    end: _ => (db.select("select * from product where status = 'bidding' order by timediff(end, start) asc limit 5")),
    price: _ => db.select("select * from product where status = 'bidding' order by current desc limit 5"),
    bid: _ => db.select("select * from product where status = 'bidding' order by bids desc limit 5"),
    category: category => db.select(`select distinct product.* from product, category where product.category = category.id and (category.id = ${category} or category.parent = ${category})`),
    search: text => db.select(`select distinct * from product where match(name, description) against ('${text}' in natural language mode)`),
    detail: id => db.select(`select * from product where product.id = ${id}`),
    related: category => db.select(`select * from product where product.category = ${category} order by product.start desc limit 5`),
    countByCat: async category => {
        const row = await db.select( `select * from product where product.category = ${category}`);
        return row.length;
    },
    refresh: _ => db.refresh()
};