// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportConfig = require('../../../app/model/config');
import ExportTablesPExercises = require('../../../app/model/tables/p_exercises');
import ExportTablesPJustice = require('../../../app/model/tables/p_justice');
import ExportTablesPMsg = require('../../../app/model/tables/p_msg');
import ExportTablesPPaper = require('../../../app/model/tables/p_paper');
import ExportTablesPPaperUser = require('../../../app/model/tables/p_paper_user');
import ExportTablesPPermission = require('../../../app/model/tables/p_permission');
import ExportTablesPRecord = require('../../../app/model/tables/p_record');
import ExportTablesPReservation = require('../../../app/model/tables/p_reservation');
import ExportTablesPReservationType = require('../../../app/model/tables/p_reservation_type');
import ExportTablesPRole = require('../../../app/model/tables/p_role');
import ExportTablesPType = require('../../../app/model/tables/p_type');
import ExportTablesPUser = require('../../../app/model/tables/p_user');

declare module 'egg' {
  interface IModel {
    Config: ReturnType<typeof ExportConfig>;
    Tables: {
      PExercises: ReturnType<typeof ExportTablesPExercises>;
      PJustice: ReturnType<typeof ExportTablesPJustice>;
      PMsg: ReturnType<typeof ExportTablesPMsg>;
      PPaper: ReturnType<typeof ExportTablesPPaper>;
      PPaperUser: ReturnType<typeof ExportTablesPPaperUser>;
      PPermission: ReturnType<typeof ExportTablesPPermission>;
      PRecord: ReturnType<typeof ExportTablesPRecord>;
      PReservation: ReturnType<typeof ExportTablesPReservation>;
      PReservationType: ReturnType<typeof ExportTablesPReservationType>;
      PRole: ReturnType<typeof ExportTablesPRole>;
      PType: ReturnType<typeof ExportTablesPType>;
      PUser: ReturnType<typeof ExportTablesPUser>;
    }
  }
}
