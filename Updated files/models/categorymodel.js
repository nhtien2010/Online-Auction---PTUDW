const db = require('../utils/db');

module.exports = {
    all: _ => (db.select('select * from category')),
};