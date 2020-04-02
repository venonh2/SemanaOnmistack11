const crypto = require('crypto');

module.exports = function GenerateUniqueId(){ // no mode é module.exports
    return crypto.randomBytes(4).toString('HEX');
}