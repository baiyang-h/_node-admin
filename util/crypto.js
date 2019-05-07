/**
 * 加密
 */

const crypto = require('crypto');

module.exports = (secret) => {
  const hash = crypto.createHmac('md5', secret).digest('hex');
  return hash
};