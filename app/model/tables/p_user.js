module.exports =app => {
  const { STRING, INTEGER } = app.Sequelize;
  const p_user = app.model.define(
    "p_user",
    {
      id: {
        type: INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        comment: "用户id",
      },
      account: {
        type: STRING(50),
        unique: false,
        comment: "用户账号",
        allowNull: true
      },
      phone: { type: STRING(11), comment: "用户电话", allowNull: true },
      password: { type: STRING(50), comment: "密码", allowNull: true },
      name: { type: STRING(10), comment: "用户姓名", allowNull: true },
      birthday: { type: STRING(13), comment: "生日", allowNull: true },
      gender: { type: INTEGER(1), comment: "性别，1男2女", defaultValue:1},
      avatar: { type: STRING(255), comment: "头像地址", allowNull: true },
      criminal_id: { type: STRING(50), comment: "服刑人员编码", allowNull: true },
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
      role_id: {type:INTEGER(11), comment:"角色id，管理者admin 咨询师doctor 中心工作人员worker 来访者visitor 服刑人员criminal"},
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
      ]
    }
  
  );
  

  
  
  // console.log(app.model);
  // app.model.models.p_user.belongsTo(app.model.models.p_role,{foreignKey:"role_id"});
  p_user.associate=function(){
    app.model.Tables.PUser.belongsTo(app.model.Tables.PRole,{foreignKey:"role_id", onDelete:"SET NULL"});
    app.model.Tables.PUser.hasMany(app.model.Tables.PReservation,{foreignKey:"from_id"});
    app.model.Tables.PUser.hasMany(app.model.Tables.PReservation,{foreignKey:"to_id"});
    app.model.Tables.PUser.hasMany(app.model.Tables.PRecord,{foreignKey:"operator_id"});
    app.model.Tables.PUser.hasMany(app.model.Tables.PRecord,{foreignKey:"worker_id"});
    // app.model.Tables.PUser.belongsTo(app.model.Tables.PRole,{foreignKey:"role_id", onDelete:"SET NULL"});
  }
  

  // console.log(app.model.models.p_role);
  
  
  return p_user;
};
