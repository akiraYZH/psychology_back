module.exports = (app) => {
    const { STRING, INTEGER, TEXT} = app.Sequelize;
    const p_permission = app.model.define(
      "p_permission",
      {
        id: {
          type: INTEGER,
          primaryKey: true,
          autoIncrement: true,
          comment: "用户id",
        },
        apis: {
          type: TEXT,
          comment: "接口",
          allowNull: false
        },
        name:{
            type:STRING(50),
            comment: "权限标识符"
        },
        status: {type:INTEGER(11),defaultValue:1,comment:"1:正常 0:停止使用"}
      },
      {
        //timestamp:true会自动创建created_at和updated_at字段
        timestamps: false,
        tableName: "p_permission"
      }
    );
  
  
    // p_permission.sync({
    //   //改变表的结构，保留数据
    //   alter: true
    // }).then(() => {
    //   console.log("p_permission Table has been created");
    // });
    return p_permission;
  };