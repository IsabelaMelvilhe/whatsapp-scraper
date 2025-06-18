const service = require("./service");
const Mensagem = require("./Mensagem");
const httpstatus = require("http-status");

module.exports = {
  async listAll(req, res, next) {
    try {
      const result = await service.listar();
      res.status(httpstatus.status.OK);
      res.send(result);
    } catch (error) {
      console.log(error);
    }
  },

  async create(req, res, next) {
    try {
      const body = req.body;
      const mensagem = new Mensagem(body);
      await mensagem.validar();
      await mensagem.criar(body);
      res.status(httpstatus.status.CREATED);
      res.send(mensagem);
    } catch (error) {
      console.log(error);
    }
  },
};
