const db = require('../utils/db');
const config = require('../config/default.json');

module.exports = {
    end: _ => (db.select("select * from product where status = 'bidding' order by end asc limit 5")),
    price: _ => db.select("select * from product where status = 'bidding' order by current desc limit 5"),
    bids: _ => db.select("select * from product where status = 'bidding' order by bids desc limit 5"),
    category: category => db.select(`select distinct product.* from product, category where product.category = category.id and (category.id = ${category} or category.parent = ${category})`),
    search: text => db.select(`select distinct * from product where match(name, description) against ('${text}' in natural language mode)`),
    detail: id => db.select(`select * from product where product.id = ${id}`),
    related: category => db.select(`select * from product where product.category = ${category} order by product.start desc limit 5`),
    refresh: _ => db.refresh(),
    countByCat: async category => {
        const row = await db.select( `select * from product where product.category = ${category}`);
        return row.length;
    },
    all: _ => (db.select('select * from product')),
    delete: prodid => db.delete({id: prodid}, 'product'),
    countByUser: async userid => {
        const row = await db.select(`select * from product where product.seller = ${userid}`);
        return row.length;
    },
    page: offset => db.select(`select * from product limit ${config.pagination.limit} offset ${offset}`),
    total: async _ => {
        const row = await db.select( `select * from product`);
        return row.length;
    },
    history: id => db.select(`select history.time, history.offer, user.name from history, user where history.product=${id} and history.user=user.id order by time asc`),
    sold: _ => db.select("select distinct product.id, product.name, holder.name as holder, holder.email as holderemail, product.current as price, seller.name as seller, seller.email as selleremail from product, user as holder, user as seller where product.status='sold' and product.announcement is null and product.holder=holder.id and product.seller=seller.id" ),
    expired: _ => db.select("select distinct product.id, product.name, seller.name as seller, seller.email as selleremail from product, user as seller where product.status='expired' and product.announcement is null and product.seller=seller.id"),
    update: (entity, condition) => db.update(entity, condition, 'product'),
    UpdateProduct: id => db.UpdateProduct(id),
    bid: entity => db.select(`select history.offer as price, bidder.name as bidder, bidder.email as bidderemail, seller.name as seller, seller.email as selleremail, product.name, product.increment from history, user as bidder, product, user as seller where history.product=${entity.product} and history.user=${entity.user} and product.id=history.product and bidder.id=history.user and product.seller=seller.id order by history.offer desc limit 1`),
    holder: id => db.select(`select user.name, user.email from history, user where history.product=${id} and user.id=history.user order by history.offer desc limit 1`),
    xfactor: entity => db.select(`select user.name, user.email from automation, user where automation.product=${entity.product} and automation.offer >= ${entity.offer} and user.id=automation.user order by automation.offer desc limit 1`),
    wonlist: id => db.select(`select distinct * from product where holder=${id} and status='sold'`),
    participate: id => db.select(`select distinct product.* from product, history where product.status='bidding' and product.id=history.product and history.user=${id}`),
    watchlist: id => db.select(`select product.* from product, watchlist where product.id=watchlist.product and watchlist.user=${id}`),
    ongoing: id => db.select(`select * from product where product.seller=${id} and product.status='bidding`),
    soldlist: id => db.select(`select * from product where product.seller=${id} and product.status='sold'`)
};