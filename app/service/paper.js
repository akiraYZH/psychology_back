const Service = require("egg").Service;

class ReservationService extends Service {
  async detailAdmin(aIds) {
    let sql = `SELECT id, title, option_score_obj, mold_id, type_id FROM p_exercises WHERE 1=1`;
    let conditions = "";

    conditions += " AND (" + aIds.join(" OR id=") + ")";
    conditions += " AND status=1";
    sql += conditions;
    console.log(sql);

    return await this.app.mysql.query(sql);
  }


  async detail(aIds) {
    let sql = `SELECT id, title, option_obj, mold_id, type_id FROM p_exercises WHERE 1=1`;
    let conditions = "";

    conditions += " AND (" + aIds.join(" OR id=") + ")";
    conditions += " AND status=1";
    sql += conditions;
    console.log(sql);

    return await this.app.mysql.query(sql);
  }


  async list() {
    let sql = `SELECT p.id, p.title, p.worker_id, u.name, p.time_stamp FROM p_paper p INNER JOIN p_user u ON  p.worker_id=u.id`;

    console.log(sql);

    return await this.app.mysql.query(sql);
  }
}

module.exports = ReservationService;
