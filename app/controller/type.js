"use strict";

const Controller = require("egg").Controller;
console.log(123);
class TypeController extends Controller {

  /**
   * @api {Get} /api/type/getList 获得心理问题类型
   * @apiGroup Type
   * @apiSuccessExample 成功返回
   {
    "code": 1,
    "msg": "成功操作",
    "data": [
        {
            "id": 2,
            "name": "躯体化"
        },
        {
            "id": 3,
            "name": "强迫症状"
        },
        {
            "id": 4,
            "name": "人际关系敏感"
        },
        {
            "id": 5,
            "name": "抑郁"
        },
        {
            "id": 6,
            "name": "焦虑"
        },
        {
            "id": 7,
            "name": "敌对"
        },
        {
            "id": 8,
            "name": "恐怖"
        },
        {
            "id": 9,
            "name": "偏执"
        },
        {
            "id": 10,
            "name": "精神病性"
        },
        {
            "id": 11,
            "name": "其他"
        }
      ]
    }
   * 
   */
  async getList() {
    console.log(123);

    const { ctx, service } = this;
    let result = await service.common.select("p_type", "", ["id", "name"]);
    result=result.filter(item=>{
      if(item.name=='总分'){
        return false;
      }else{
        return true;
      }
    })
    console.log(result);
    
    if (result.length) {
      ctx.body = new ctx.helper._success(result);
    } else {
      ctx.body = new ctx.helper._error('暂无数据');
    }
    // this.ctx.body = new this.ctx.helper._notFound();
  }
}

module.exports = TypeController;
