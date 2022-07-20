const helmet = require("helmet");
const compressions = require("compression");

module.exports = function (app){
    app.use(helmet());
    app.use(compressions());
}