// 是否同步数据库结构
let isSync = false;

module.exports = (app) => {
  app.beforeStart(async () => {
    if (isSync) {
      await app.model.sync({ alter: true });
    }
  });
};
