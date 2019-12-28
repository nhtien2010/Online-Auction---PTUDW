const moment = require('moment');

var register = function (Handlebars) {
    var helpers = {
        remain: function (start, end) {
            if (moment(end).diff(start, 'days') > 0)
                return moment(end).diff(start, 'days') + 'd';
            else if (moment(end).diff(start, 'hours') > 0)
                return moment(end).diff(start, 'hours') + 'h';
            else if (moment(end).diff(start, 'minutes') > 0)
                return moment(end).diff(start, 'minutes') + 'm';
            else if (moment(end).diff(start, 'seconds') > 0)
                return moment(end).diff(start, 'seconds') + 's';
        },
        time: function(time) {
            time = moment(time.toString(), "eee mmm DD YYYY hh:mm:ss").format("YYYY/MM/DD");
            return time;
        },
        new: function (start, end) {
            if(moment(end).diff(start, 'days') > 1)
                return;
            return "<i class='fa fa-rocket text-danger'></i>";
        },
        equal: function (first, second) {
            return first == second;
        },
        root: function (set, root) {
            for(var i = 0; i < set.length; i++) {
                if(set[i].parent == root)
                    return true;
            }
            return false;
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