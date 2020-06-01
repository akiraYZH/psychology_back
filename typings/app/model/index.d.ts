// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportMain = require('../../../app/model/main');
import ExportTablesPExercises = require('../../../app/model/tables/p_exercises');
import ExportTablesPJustice = require('../../../app/model/tables/p_justice');
import ExportTablesPMsg = require('../../../app/model/tables/p_msg');
import ExportTablesPPaper = require('../../../app/model/tables/p_paper');
import ExportTablesPPaperUser = require('../../../app/model/tables/p_paper_user');
import ExportTablesPRecord = require('../../../app/model/tables/p_record');
import ExportTablesPReservation = require('../../../app/model/tables/p_reservation');
import ExportTablesPReservationType = require('../../../app/model/tables/p_reservation_type');
import ExportTablesPType = require('../../../app/model/tables/p_type');
import ExportTablesPUser = require('../../../app/model/tables/p_user');

declare module 'egg' {
  interface IModel {
    Main: ReturnType<typeof ExportMain>;
    Tables: {
      PExercises: ReturnType<typeof ExportTablesPExercises>;
      PJustice: ReturnType<typeof ExportTablesPJustice>;
      PMsg: ReturnType<typeof ExportTablesPMsg>;
      PPaper: ReturnType<typeof ExportTablesPPaper>;
      PPaperUser: ReturnType<typeof ExportTablesPPaperUser>;
      PRecord: ReturnType<typeof ExportTablesPRecord>;
      PReservation: ReturnType<typeof ExportTablesPReservation>;
      PReservationType: ReturnType<typeof ExportTablesPReservationType>;
      PType: ReturnType<typeof ExportTablesPType>;
      PUser: ReturnType<typeof ExportTablesPUser>;
    }
  }
}
