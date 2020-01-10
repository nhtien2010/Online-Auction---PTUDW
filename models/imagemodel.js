const db = require('../utils/db');

module.exports = {
    product: product => db.select(`select * from image where product=${product}`),
    delete: ProId => db.delete({product: ProId}, 'image'),

};