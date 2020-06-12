'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = async (app) => {
  const { router, controller } = app,
    preRouter = '/api';
  
    
    
   
  //已经修改
  router.post(preRouter + '/login/login', controller.login.login);
  router.get(preRouter + '/user/userInfo', controller.user.userInfo);
  router.post(preRouter + '/user/logout', controller.user.logout);
  router.get(preRouter + '/user/userDetail', controller.user.userDetail);
  router.get(preRouter + '/user/userList', controller.user.userList);
  router.post(preRouter + '/user/register', controller.user.register);
  router.post(preRouter + '/user/multiAdd', controller.user.multiAdd);
  router.put(preRouter + '/user/userChange', controller.user.userChange);
  router.delete(preRouter + '/user/userDel', controller.user.userDel);

  //已经修改
  router.get(preRouter + '/reservation/getList', controller.reservation.getList);
  router.post(preRouter + '/reservation/addReservation', controller.reservation.addReservation);
  router.put(preRouter + '/reservation/modify', controller.reservation.modify);
  router.delete(preRouter + '/reservation/del', controller.reservation.del);

  //已经修改
  router.post(preRouter + '/reservationType/add', controller.reservationType.add);
  router.get(preRouter + '/reservationType/getList', controller.reservationType.getList);
  router.put(preRouter + '/reservationType/update', controller.reservationType.update);
  router.delete(preRouter + '/reservationType/del', controller.reservationType.del);
  
  
  router.post(preRouter + '/exercise/add', controller.exercise.add);
  router.post(preRouter + '/exercise/multiAdd', controller.exercise.multiAdd);
  router.get(preRouter + '/exercise/getList', controller.exercise.getList);
  router.put(preRouter + '/exercise/update', controller.exercise.update);
  router.delete(preRouter + '/exercise/del', controller.exercise.del);

  router.post(preRouter + '/paper/add', controller.paper.add);
  router.post(preRouter + '/paper/getList', controller.paper.getList);
  router.get(preRouter + '/paper/detail-score', controller.paper.detailAdmin);
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

  //已经修改
  router.post(preRouter + '/msg/add', controller.message.add);
  router.get(preRouter + '/msg/getList', controller.message.getList);
  router.put(preRouter + '/msg/update', controller.message.update);
  router.delete(preRouter + '/msg/del', controller.message.del);

  //新增
  router.post(preRouter + '/role/add', controller.role.add);
  router.get(preRouter + '/role/get', controller.role.get);
  router.get(preRouter + '/role/routes', controller.role.getOne);
  router.put(preRouter + '/role/update', controller.role.update);
  router.del(preRouter + '/role/del', controller.role.del);

  //已经修改
  router.get(preRouter+'/type/getList', controller.type.getList);
  
  router.post('/*', controller.melon.index);
  router.get('/*', controller.melon.index);


  

  
};
