const productmodel = require('../models/productmodel');
const user = require('../models/usermodel');
const moment = require('moment');
const configuration = require('../config/default.json');
const crypt = require('../utils/crypt');
const mailgun = require('mailgun-js')({ apiKey: crypt.decrypt(configuration.mailgun.api_key), domain: crypt.decrypt(configuration.mailgun.domain) });

module.exports = function (app) {
    setInterval(async function () {
        await productmodel.refresh();
        const sold = await productmodel.sold();
        const expired = await productmodel.expired();

        sold.forEach(async function (item) {
            var data = {
                from: 'Web Nerdy Team <Zerd@WNT.com>',
                to: item.holderemail,
                subject: 'Online Auction',
                text: `Hi ${item.holder},\nCongratulations\nYou've bid successfully: ${item.name}\nWith: ${item.price}$\nThank you for joining us!\nHappy bidding!\nSent: ${moment()}`
            };
            mailgun.messages().send(data);

            data = {
                from: 'Web Nerdy Team <Zerd@WNT.com>',
                to: item.selleremail,
                subject: 'Online Auction',
                text: `Hi ${item.seller},\nCongratulations\nYou've sold successfully: ${item.name}\nWith: ${item.price}$\nThank you for joining us!\nHappy selling!\nSent: ${moment()}`
            };
            mailgun.messages().send(data);

            const entity = {
                announcement: 'done'
            }
            const condition = {
                id: item.id
            }

            await productmodel.update(entity, condition);
        });

        expired.forEach(async function (item) {
            var data = {
                from: 'Web Nerdy Team <Zerd@WNT.com>',
                to: item.selleremail,
                subject: 'Online Auction',
                text: `Hi ${item.seller},\nUnfortunately\nYour product: ${item.name}\nHas been expired!\nThank you for joining us!\nHappy selling!\nSent: ${moment()}`
            };
            mailgun.messages().send(data);

            const entity = {
                announcement: 'done'
            }
            const condition = {
                id: item.id
            }

            await productmodel.update(entity, condition);
        });
    }, 60000);

};
