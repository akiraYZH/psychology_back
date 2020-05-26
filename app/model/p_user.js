module.exports = (app) => {
  const { STRING, INTEGER } = app.Sequelize;
  const p_user = app.model.define(
    "p_user",
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: "用户id",
      },
      account: {
        type: STRING(50),
        unique: false,
        comment: "用户账号",
        allowNull: false
      },
      phone: { type: STRING(11), comment: "用户电话", allowNull: true },
      password: { type: STRING(50), comment: "密码", allowNull: true },
      name: { type: STRING(10), comment: "用户姓名", allowNull: true },
      birthday: { type: STRING(13), comment: "生日", allowNull: true },
      gender: { type: INTEGER(1), comment: "性别，1男2女", defaultValue:1},
      avatar: { type: STRING(255), comment: "头像地址", allowNull: true },
      justice_id: {
        type: INTEGER(11),
        comment: "司法所，服刑犯人才需要填",
        defaultValue: 0,
      },
      parent_id: {
        type: INTEGER(11),
        defaultValue: 0,
        comment: "来访者才有父类",
      },
      is_marry: {type:INTEGER(11),defaultValue:2,comment:"是否结婚,1是2否"},
      education: {type:STRING(255), allowNull:true, comment:"学历"},
      job: {type:STRING(255), allowNull:true, comment:"职业"},
      urgent_name: {type:STRING(255), allowNull:true, comment:"紧急联系人"},
      urgent_relation: {type:STRING(255), allowNull:true, comment:"紧急联系人关系"},
      urgent_phone: {type:STRING(255), allowNull:true, comment:"紧急联系人电话"},
      roles: {type:STRING(255), comment:"角色，管理者admin 咨询师doctor 中心工作人员worker 来访者visitor 服刑人员criminal"},
      status: {type:INTEGER(11),defaultValue:1,comment:"1:正常 0:停止使用"}
    },
    {
      //timestamp:true会自动创建created_at和updated_at字段
      timestamps: false,
      tableName: "p_user",
      indexes: [
        {
            unique: true,
            fields: ['account']
        }
      ]}
  
  );


  // p_user.sync({
  //   //改变表的结构，保留数据
  //   alter: true
  // }).then(() => {
  //   console.log("p_user Table has been created");
  // });
  return p_user;
};
