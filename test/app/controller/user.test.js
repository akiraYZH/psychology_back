"use strict";

const { app, assert } = require("egg-mock/bootstrap");
const sinon = require("sinon");
const common = require("../../../app/service/common");

//describe函数的第一个参数是这个测试文件的描述, 是测试路径
describe("test/app/controller/user.test.js", () => {
    //测试功能的描述
  it("should get user info detail", async () => {
      //运用sinon.js中的stub来模拟数据库操作，直接替换掉common对象中的get方法， 并设置返回值
    var get = sinon.stub(common.prototype, "get").returns({
      id: 1,
      account: "admin",
      phone: "110",
      password: "123456",
      name: "admin",
      birthday: null,
      gender: 1,
      avatar:
        "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
      justice_id: 0,
      parent_id: 0,
      is_marry: 2,
      education: "本科",
      job: "总经理",
      urgent_name: "张三",
      urgent_relation: "爸爸",
      urgent_phone: "120",
      roles: "admin",
      status: 1,
    });


    // 检验是否有正确返回
    let result = await app
      .httpRequest()
      .get("/api/user/userDetail?account=admin")
      .expect(
        `{"code":1,"msg":"成功操作","data":{"id":1,"roles":"admin","account":"admin","password":"123456","gender":1,"name":"admin","birthday":null,"phone":"110","avatar":"https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"}}`
      );

    //保证传入service.common.get中是参数是对的
    sinon.assert.calledWith(get, "p_user", { account: "admin", status: 1 });
    get.restore();
  });
});
