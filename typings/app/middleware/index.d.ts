// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportIsLogin = require('../../../app/middleware/isLogin');
import ExportResponseOption = require('../../../app/middleware/responseOption');

declare module 'egg' {
  interface IMiddleware {
    isLogin: typeof ExportIsLogin;
    responseOption: typeof ExportResponseOption;
  }
}
