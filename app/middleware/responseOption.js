'use strict';


module.exports = () => {
    return async function responseOption(ctx, next) {
        /* 解决OPTIONS请求 */
        if (ctx.method == 'OPTIONS') {
            ctx.body = '';
            ctx.status = 204;
        } else {
            await next();
        }
    }
}