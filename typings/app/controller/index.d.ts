// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportDistribution = require('../../../app/controller/distribution');
import ExportExercise = require('../../../app/controller/exercise');
import ExportLogin = require('../../../app/controller/login');
import ExportMelon = require('../../../app/controller/melon');
import ExportMessage = require('../../../app/controller/message');
import ExportPaper = require('../../../app/controller/paper');
import ExportRecord = require('../../../app/controller/record');
import ExportReservation = require('../../../app/controller/reservation');
import ExportReservationType = require('../../../app/controller/reservationType');
import ExportType = require('../../../app/controller/type');
import ExportUser = require('../../../app/controller/user');

declare module 'egg' {
  interface IController {
    distribution: ExportDistribution;
    exercise: ExportExercise;
    login: ExportLogin;
    melon: ExportMelon;
    message: ExportMessage;
    paper: ExportPaper;
    record: ExportRecord;
    reservation: ExportReservation;
    reservationType: ExportReservationType;
    type: ExportType;
    user: ExportUser;
  }
}
