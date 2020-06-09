// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportCommon = require('../../../app/service/common');
import ExportLogin = require('../../../app/service/login');
import ExportMessage = require('../../../app/service/message');
import ExportPaper = require('../../../app/service/paper');
import ExportRecord = require('../../../app/service/record');
import ExportReservation = require('../../../app/service/reservation');
import ExportReservationType = require('../../../app/service/reservationType');
import ExportType = require('../../../app/service/type');
import ExportUser = require('../../../app/service/user');

declare module 'egg' {
  interface IService {
    common: AutoInstanceType<typeof ExportCommon>;
    login: AutoInstanceType<typeof ExportLogin>;
    message: AutoInstanceType<typeof ExportMessage>;
    paper: AutoInstanceType<typeof ExportPaper>;
    record: AutoInstanceType<typeof ExportRecord>;
    reservation: AutoInstanceType<typeof ExportReservation>;
    reservationType: AutoInstanceType<typeof ExportReservationType>;
    type: AutoInstanceType<typeof ExportType>;
    user: AutoInstanceType<typeof ExportUser>;
  }
}
