<<<<<<< HEAD
const db = require('../utils/db');

module.exports = {
    product: product => db.select(`select * from image where product=${product}`)
=======
const db = require('../utils/db');

module.exports = {
    product: product => db.select(`select * from image where product=${product}`)
>>>>>>> 6987579b77c3238c353efc7187a6af4e771db3a0
};