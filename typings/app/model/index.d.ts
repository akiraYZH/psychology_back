// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportIsSync = require('../../../app/model/isSync');
import ExportPExercises = require('../../../app/model/p_exercises');
import ExportPJustice = require('../../../app/model/p_justice');
import ExportPMsg = require('../../../app/model/p_msg');
import ExportPPaper = require('../../../app/model/p_paper');
import ExportPPaperUser = require('../../../app/model/p_paper_user');
import ExportPRecord = require('../../../app/model/p_record');
import ExportPReservation = require('../../../app/model/p_reservation');
import ExportPReservationType = require('../../../app/model/p_reservation_type');
import ExportPType = require('../../../app/model/p_type');
import ExportPUser = require('../../../app/model/p_user');

declare module 'egg' {
  interface IModel {
    IsSync: ReturnType<typeof ExportIsSync>;
    PExercises: ReturnType<typeof ExportPExercises>;
    PJustice: ReturnType<typeof ExportPJustice>;
    PMsg: ReturnType<typeof ExportPMsg>;
    PPaper: ReturnType<typeof ExportPPaper>;
    PPaperUser: ReturnType<typeof ExportPPaperUser>;
    PRecord: ReturnType<typeof ExportPRecord>;
    PReservation: ReturnType<typeof ExportPReservation>;
    PReservationType: ReturnType<typeof ExportPReservationType>;
    PType: ReturnType<typeof ExportPType>;
    PUser: ReturnType<typeof ExportPUser>;
  }
}
