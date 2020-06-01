module.exports = (app) => {
  const { STRING, INTEGER, TEXT } = app.Sequelize;
  const p_reservation_type = app.model.define(
    "p_reservation_type",
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: "预约类型id",
      },
      type_name: {
        type: STRING(255),
        comment: "预约类型名称",
        allowNull: false,
      },
      description: { type: TEXT, comment: "预约类型描述", allowNull: false },
      status: {
        type: INTEGER(11),
        defaultValue: 1,
        comment: "1:正常 0:停止使用",
        allowNull: false,
      },
    },
    {
      //timestamp:true会自动创建created_at和updated_at字段
      timestamps: false,
      tableName: "p_reservation_type",
    }
  );

  p_reservation_type
    .sync({
      //改变表的结构，保留数据
      alter: true,
    })
    .then(() => {
      console.log("p_reservation_type Table has been created");
    });
  return p_reservation_type;
};
