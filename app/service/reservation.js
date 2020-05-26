const Service = require('egg').Service;
const parseTime = require('../utils/parseTime');

class ReservationService extends Service {
  async getList(to_id) {
    // const Literal = this.app.mysql.literals.Literal;
    // let condition={
    //     columns:['from_id', 'to_id']
    // };
    // if(role=)
    let sql = `SELECT r.id, r.from_id, u1.name AS from_name ,r.to_id, r.type_name, u2.name AS to_name ,r.start_time, r.end_time, r.status, r.method FROM p_reservation r, p_user u1, p_user u2 WHERE r.from_id = u1.id AND r.to_id=u2.id AND u1.status <> 0 AND u2.status <> 0 AND r.state <> 0 AND r.to_id='${to_id}'`;
        
    console.log(sql);
    
    return await this.app.mysql.query(sql);
  }
}

module.exports = ReservationService;