'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = async (app) => {
  const { router, controller } = app,
    preRouter = '/api';
  
    
    
   
  
  router.post(preRouter + '/login/login', controller.login.login);
  router.get(preRouter + '/user/userInfo', controller.user.userInfo);
  router.post(preRouter + '/user/logout', controller.user.logout);
  router.get(preRouter + '/user/userDetail', controller.user.userDetail);
  router.get(preRouter + '/user/userList', controller.user.userList);
  router.post(preRouter + '/user/register', controller.user.register);
  router.post(preRouter + '/user/multiAdd', controller.user.multiAdd);
  router.post(preRouter + '/user/userChange', controller.user.userChange);
  router.post(preRouter + '/user/userDel', controller.user.userDel);

  router.get(preRouter + '/reservation/getList', controller.reservation.getList);
  router.post(preRouter + '/reservation/addReservation', controller.reservation.addReservation);
  router.post(preRouter + '/reservation/modify', controller.reservation.modify);
  router.post(preRouter + '/reservation/del', controller.reservation.del);

  router.post(preRouter + '/reservation_type/add', controller.reservationType.add);
  router.get(preRouter + '/reservation_type/getList', controller.reservationType.getList);
  router.post(preRouter + '/reservation_type/update', controller.reservationType.update);
  router.post(preRouter + '/reservation_type/del', controller.reservationType.del);
  // router.post(preRouter + '/member/userInfo', controller.member.userInfo);
  router.post(preRouter + '/exercise/add', controller.exercise.add);
  router.post(preRouter + '/exercise/multiAdd', controller.exercise.multiAdd);
  router.post(preRouter + '/exercise/getList', controller.exercise.getList);
  router.post(preRouter + '/exercise/update', controller.exercise.update);
  router.post(preRouter + '/exercise/del', controller.exercise.del);

  router.post(preRouter + '/paper/add', controller.paper.add);
  router.post(preRouter + '/paper/getList', controller.paper.getList);
  router.get(preRouter + '/paper/detailAdmin', controller.paper.detailAdmin);
  router.get(preRouter + '/paper/detail', controller.paper.detail);
  router.post(preRouter + '/paper/update', controller.paper.update);
  router.post(preRouter + '/paper/del', controller.paper.del);

  router.post(preRouter + '/record/add', controller.record.add);
  router.get(preRouter + '/record/getUserList', controller.record.getUserList);
  router.post(preRouter + '/record/getRecords', controller.record.getRecords);
  router.get(preRouter + '/record/getOneRecords', controller.record.getOneRecord);
  router.post(preRouter + '/record/updateTalkRecord', controller.record.updateTalkRecord);
  router.post(preRouter + '/record/del', controller.record.del);

  router.post(preRouter + '/distribution/add', controller.distribution.add);
  router.post(preRouter + '/distribution/multiAdd', controller.distribution.multiAdd);
  router.post(preRouter + '/distribution/getList', controller.distribution.getList);
  router.post(preRouter + '/distribution/update', controller.distribution.update);
  router.post(preRouter + '/distribution/del', controller.distribution.del);

  router.post(preRouter + '/msg/add', controller.message.add);
  router.post(preRouter + '/msg/getList', controller.message.getList);
  router.post(preRouter + '/msg/update', controller.message.update);
  router.post(preRouter + '/msg/del', controller.message.del);

  router.get(preRouter+'/type/getList', controller.type.getList);
  
  router.get(preRouter+'/test/get', controller.test.get);
  router.post('/*', controller.melon.index);
  router.get('/*', controller.melon.index);


  

  
};
