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
        content: {
          type: TEXT,
          comment: "权限内容",
          allowNull: false
        },
        type:{
            type:INTEGER,
            comment: "1:路由, 2:接口, 3:其他",
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