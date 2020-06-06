'use strict';

const Controller = require('egg').Controller;

class TestController extends Controller {
  async get() {
      console.log(this.app.model,123);
      
       let result =  await this.app.model.Tables.PUser.findOne({
      include:{
        model:this.app.model.Tables.PRole
      },
      where:{
        id:1
      }
    });
  
    console.log(result);
    this.ctx.body =result;
  }
}

module.exports = TestController;