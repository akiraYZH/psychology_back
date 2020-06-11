// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportIsLogin = require('../../../app/middleware/isLogin');
import ExportPermissionCheck = require('../../../app/middleware/permissionCheck');
import ExportResponseOption = require('../../../app/middleware/responseOption');

declare module 'egg' {
  interface IMiddleware {
    isLogin: typeof ExportIsLogin;
    permissionCheck: typeof ExportPermissionCheck;
    responseOption: typeof ExportResponseOption;
  }
}
