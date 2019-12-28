const db = require('../utils/db');

module.exports = {
    end: _ => (db.select('select * from product order by timediff(end, start) asc limit 5')),
    price: _ => db.select('select * from product order by current desc limit 5'),
    bid: _ => db.select('select * from product order by bids desc limit 5'),
    category: _ => db.select('select distinct product.* from product, category where product.category = category.id and (category.id = category or category.parent = category)')
};