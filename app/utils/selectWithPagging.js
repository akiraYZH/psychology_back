const selectWithPagging = async function (model, options) {
  fix(options);

  let result = await model.findAndCountAll(options);
  let current = Number(options.offset) / Number(options.offset) + 1;

  let res = {
    pagging: {
      size: options.limit,
      current: current || 1,
      total: result.count,
    },
    data: result.rows,
  };
  return res;

  function fix(obj) {
    //去掉所有空的属性
    if (Object.keys(obj).length) {
      Object.keys(obj).forEach((attr) => {
       eleminate(obj,attr)
      });
    }

    //处理Op的Symbol
    if(Object.getOwnPropertySymbols(obj).length){
      for(let i =0;i<Object.getOwnPropertySymbols(obj).length;i++){
        console.log(obj,Object.getOwnPropertySymbols(obj)[i]);
        
        eleminate(obj,Object.getOwnPropertySymbols(obj)[i]);
      }
    }
  }


  function eleminate(obj,attr){
    if (obj[attr] instanceof Object) {
      if (obj[attr] instanceof Array) {
        if (!obj[attr].length) {
          delete obj[attr];
        }
      } else {
        if (attr != "model") {
          if (
            Object.keys(obj[attr]).length == 0 &&
            !Object.getOwnPropertySymbols(obj[attr]).length
          ) {
            delete obj[attr];
          } else {
            fix(obj[attr]);
          }
        }
      }
    } else {

      if (obj[attr] == undefined || obj[attr] == null || obj[attr] == "") {
        delete obj[attr];
      }
      else if (typeof obj[attr] == "string") {
        if (
          obj[attr].indexOf("undefined") != -1 ||
          obj[attr].indexOf("null") != -1
        ) {
          obj[attr] = "%%";
        }
      }
    }
  }
};

module.exports = selectWithPagging;
