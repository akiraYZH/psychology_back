module.exports = (app) => {
    const { STRING, INTEGER } = app.Sequelize;
    const p_role = app.model.define(
      "p_role",
      {
        id: {
          type: INTEGER,
          primaryKey: true,
          autoIncrement: true,
          comment: "用户id",
        },
        name: {
          type: STRING(50),
          unique: false,
          comment: "角色名",
          allowNull: false
        },
        status: {type:INTEGER(11),defaultValue:1,comment:"1:正常 0:停止使用"}
      },
      {
        //timestamp:true会自动创建created_at和updated_at字段
        timestamps: false,
        tableName: "p_role"
      }
    );
  
    // console.log(app.model);
    
    // app.model.PRole.hasMany(app.model.PPermission, {foreignKey:"role_id"})
    p_role.associate=function(){
        
        app.model.Tables.PRole.hasMany(app.model.Tables.PPermission, {foreignKey:"role_id",as:"permissions"})
    }
  
    // p_role.sync({
    //   //改变表的结构，保留数据
    //   alter: true
    // }).then(() => {
    //   console.log("p_role Table has been created");
    // });
    return p_role;
  };