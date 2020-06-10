const { _success, _error, _notFound, _lack, _notLogin } = require('../utils/resModel');
const { _checkData } = require('../utils/checkData');
const checkData = require('../utils/checkData2');
const  { _setRedis, _getRedis } = require('../utils/redisModel');
const selectWithPagging = require('../utils/selectWithPagging');
const parseTime = require("../utils/parseTime");

module.exports = {
    _success, _error, _notFound, _lack, _notLogin, _checkData, _setRedis, _getRedis, selectWithPagging, parseTime, checkData
}