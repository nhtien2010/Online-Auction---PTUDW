const moment = require('moment');

var register = function (Handlebars) {
    var helpers = {
        remain: function (end) {
            if (moment(end).diff(moment(), 'days') > 0)
                return moment(end).diff(moment(), 'days') + 'd';
            else if (moment(end).diff(moment(), 'hours') > 0)
                return moment(end).diff(moment(), 'hours') + 'h';
            else if (moment(end).diff(moment(), 'minutes') > 0)
                return moment(end).diff(moment(), 'minutes') + 'm';
            else if (moment(end).diff(moment(), 'seconds') > 0)
                return moment(end).diff(moment(), 'seconds') + 's';
            return "Expired";
        },
        time: function(time) {
            time = moment(time).format("YYYY/MM/DD");
            return time;
        },
        new: function (start) {
            if(moment().diff(start, 'days') < 1)
                return "<i class='fa fa-rocket text-danger'></i>";
        },
        equal: function (first, second) {
            return first === second;
        },
        root: function (set, root) {
            for(var i = 0; i < set.length; i++) {
                if(set[i].parent == root)
                    return true;
            }
            return false;
        },
        disable: function(status) {
            if(status == "bidding")
                return;
            return "disabled"
        }
    };

    if (Handlebars && typeof Handlebars.registerHelper === "function") {
        for (var prop in helpers) {
            Handlebars.registerHelper(prop, helpers[prop]);
        }
    } else {
        return helpers;
    }

};

module.exports.register = register;
module.exports.helpers = register(null);