const Service = require("egg").Service;
const permissions = require("../../basedData/permission");

class RoleService extends Service {
  async add(data) {
    const { ctx } = this;
    // getPermissions: [Function],
    // countPermissions: [Function],
    // hasPermission: [Function],
    // hasPermissions: [Function],
    // setPermissions: [Function],
    // addPermission: [Function],
    // addPermissions: [Function],
    // removePermission: [Function],
    // removePermissions: [Function],
    // createPermission: [Function]
    const { PRole, PPermission } = this.app.model.Tables;
    console.log(PRole.prototype);
    //创建事物对象
    let transaction = await this.ctx.model.transaction();
    try {
      let newRole = await PRole.create(ctx.request.body, { transaction });

      for (let i = 0; i < data.permissions.length; i++) {
        let modifiedPermission = JSON.parse(
          JSON.stringify(permissions[data.permissions[i]])
        );
        modifiedPermission.apis = JSON.stringify(modifiedPermission.apis);
        let newPermission = await PPermission.create(modifiedPermission, {
          transaction,
        });
        await newRole.addPermission(newPermission, { transaction });
      }

      await transaction.commit();
      console.log(newRole);

      if (newRole) {
        ctx.status = 200;
        return new ctx.helper._success({ insertId: newRole.id });
      }
    } catch (error) {
      //回滚
      console.log(error);

      await transaction.rollback();
      ctx.status = 500;
      return new ctx.helper._error(error);
    }
  }

  async get() {
    const { ctx } = this;
    const { PRole, PPermission } = this.app.model.Tables;
    try {
      let result = await PRole.findAll({
        attributes: ["id", "name"],
        where: { status: 1 },
        include: {
          model: PPermission,
          attributes: ["id", "name", "apis"],
          where: {
            status: 1,
          },
          required: false,
          as: "permissions",
        },
      });
      //   console.log(result);
      result.forEach((item) => {
        item.permissions.forEach((permission) => {
          permission.apis = JSON.parse(permission.apis);
        });
      });

      if (result.length) {
        ctx.status = 200;
        return new ctx.helper._success(result);
      } else {
        ctx.status = 404;
        return new ctx.helper._error("暂无数据");
      }
    } catch (error) {
      console.log(error);

      ctx.status = 500;
      return new ctx.helper._error(error);
    }
  }

  async update(data) {
    const { ctx } = this;
    const { PRole, PPermission } = this.app.model.Tables;
    let updatePermissions = false;

    let transaction = await this.ctx.model.transaction();

    try {
      let condition = { id: data.id, status: 1 };
      let role = await PRole.findOne({ where: { id: data.id, status: 1 } });
      delete data.id;

      let result = await PRole.update(data, { where: condition, transaction });

      if (data.permissions) {
        updatePermissions = true;
        let rolePermissions = await role.getPermissions();
        //先清空
        rolePermissions.forEach(
          async (permission) => await permission.destroy({ transaction })
        );

        //再插入
        for (let i = 0; i < data.permissions.length; i++) {
          let modifiedPermission = JSON.parse(
            JSON.stringify(permissions[data.permissions[i]])
          );
          modifiedPermission.apis = JSON.stringify(modifiedPermission.apis);
          let newPermission = await PPermission.create(modifiedPermission, {
            transaction,
          });
          await role.addPermission(newPermission, { transaction });
        }
      }

      await transaction.commit();


      if (result[0] > 0 || updatePermissions) {
        ctx.status = 200;
        return new ctx.helper._success();
      } else {
        ctx.status = 400;
        return new ctx.helper._error("没有修改");
      }
    } catch (error) {
      transaction.rollback();
      ctx.status = 500;
      return new ctx.helper._error(error);
    }
  }

  async del(data) {
    const { ctx } = this;
    const { PRole } = this.app.model.Tables;
    try {
      let condition = { id: data.id, status: 1 };
      let result = await PRole.update(
        { status: 0 },
        { where: condition }
      );
      console.log(result);

      if (result[0] > 0) {
        ctx.status = 200;
        return new ctx.helper._success();
      } else {
        ctx.status = 404;
        return new ctx.helper._error("没有删除");
      }
    } catch (error) {
      ctx.status = 500;
      return new ctx.helper._error(error);
    }
  }
}

module.exports = RoleService;
