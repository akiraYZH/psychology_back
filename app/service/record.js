const Service = require('egg').Service;

class RecordService extends Service {
  async getUserList(keyword="") {

    let sql = `SELECT DISTINCT r.operator_id, u.account, u.name FROM p_record r INNER JOIN p_user u ON r.operator_id=u.id WHERE r.status =1`;
    console.log(keyword, 133);
    
    if(keyword){
        sql += ` AND (u.account LIKE '%${keyword}%' OR u.name LIKE '%${keyword}%')`
    }
    console.log(sql);
    
    return await this.app.mysql.query(sql);
  }


  async getRecords(operator_id=null) {
    // let sql = `SELECT r.id, r.operator_id, u.account, u.name, r.worker_id, u2.name AS work_name, r.time_stamp, r.type_id, r.content, r.score, r.title, r.paper_evaluation, r.paper_exercises FROM p_record r, p_user u, p_user u2 WHERE r.operator_id=u.id AND r.worker_id=u2.id AND r.status='1'`;
    let sql = `SELECT r.id, r.operator_id, u.account, u.name, r.worker_id, u2.name AS worker_name, r.title,r.time_stamp, r.type_id FROM p_record r, p_user u, p_user u2 WHERE r.operator_id=u.id AND r.worker_id=u2.id AND r.status='1'`;
    console.log(operator_id, 133);
    if(operator_id){
      sql+=` AND r.operator_id = '${operator_id}'`
    }
    
    return await this.app.mysql.query(sql);
  }

  async getOneRecord(id=null) {
    let sql = `SELECT r.id, r.operator_id, u.account, u.name, r.worker_id, u2.name AS work_name, r.time_stamp, r.type_id, r.content, r.score, r.title, r.paper_evaluation, r.paper_exercises FROM p_record r, p_user u, p_user u2 WHERE r.operator_id=u.id AND r.worker_id=u2.id AND r.status='1'`;
    // let sql = `SELECT r.id, r.operator_id, u.account, u.name, r.worker_id, u2.name AS worker_name, r.title,r.time_stamp, r.type_id FROM p_record r, p_user u, p_user u2 WHERE r.operator_id=u.id AND r.worker_id=u2.id AND r.status='1'`;
    console.log(id, 133);
    if(id){
      sql+=` AND r.id = '${id}'`
    }
    
    return await this.app.mysql.query(sql);
  }
}

module.exports = RecordService;