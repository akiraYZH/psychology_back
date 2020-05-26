'use strict';

const Controller = require('egg').Controller;

class MelonController extends Controller {
  async index() {
    this.ctx.body = new this.ctx.helper._notFound();
  }
}

module.exports = MelonController;
