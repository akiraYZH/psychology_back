const selectWithPagging = async function (model, options) {
  let fixed = fix(options);
  let result = await model.findAndCountAll(fixed);
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
    Object.keys(obj).forEach((attr) => {
      if (obj[attr] instanceof Object) {
        if (obj[attr] instanceof Array) {
          if (!obj[attr].length) {
            delete obj[attr];
          }
        } else {
          if (attr != "model") {
            if (JSON.stringify(obj[attr]) == "{}") {
              delete obj[attr];
            } else {
              fix(obj[attr]);
            }
          }
        }
      } else {
        if (obj[attr] == undefined || obj[attr] == null || obj[attr] == "") {
          delete obj[attr];
        } else if (typeof obj[attr] == "string") {
          if (
            obj[attr].indexOf("undefined") != -1 ||
            obj[attr].indexOf("null") != -1
          ) {
            obj[attr] = "%%";
          }
        }
      }
    });

    return obj;
  }
};

module.exports = selectWithPagging;
