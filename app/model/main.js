// 是否同步数据库结构
let isSync = false;

module.exports = async (app) => {
  app.beforeStart(async () => {
    if (isSync) {
      //自动创建数据库
      await app.model.createSchema(app.config.sequelize.database);
      // 自动同步models到数据库
      await app.model.sync({ alter: true });
    }
  });
};
