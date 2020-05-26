'use strict';

// const { _getCookie } = require('../utils/cookieModel');
const { _getRedis } = require('../utils/redisModel');

module.exports = () => {
    return async function isLogin(ctx, next) {
        const ignoreArr = ['/api/login/login'];
        const redisRes = await _getRedis(ctx.request.headers['x-token']);
        if (ctx.request.headers['x-token'] && redisRes || ignoreArr.includes(ctx.url.split('?')[0])) {
            ctx.redisData = redisRes;
            await next();
        } else {
            // ctx.body = new ctx.helper._notLogin();
            await next();
        }
    }
}