module.exports = (app) => {
  const { STRING, INTEGER } = app.Sequelize;
  const p_reservation = app.model.define(
    "p_reservation",
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: "预约id",
      },
      from_id: {
        type: INTEGER,
        comment: "来访者id",
        allowNull:false
      },
      to_id: {
        type: INTEGER,
        comment: "咨询师id",
        allowNull:false
      },
      type_name: { type: STRING(255), comment: "类型名字",allowNull:false},
      method: { type: INTEGER(11), comment: "1:来访， 2:线上", defaultValue: 1,allowNull:false},
      date_time: { type: STRING(13), comment: "当天日期时间戳",allowNull:false},
      start_time: { type: STRING(13), comment: "预约开始时间戳",allowNull:false},
      end_time: { type: STRING(13), comment: "预约结束时间戳",allowNull:false},
      status: { type: INTEGER(11), comment: "预约状态，1待确认2确认待上门3成功上门4失约5咨询师主动取消",  defaultValue: 1,allowNull:false},
      state: {type:INTEGER(11),defaultValue:1,comment:"1:正常 0:停止使用",allowNull:false}
    },
    {
      //timestamp:true会自动创建created_at和updated_at字段
      timestamps: false,
      tableName: "p_reservation",
    }
  );


  // p_reservation.sync({
  //   //改变表的结构，保留数据
  //   alter: true
  // }).then(() => {
  //   console.log("p_reservation Table has been created");
  // });
  return p_reservation;
};
