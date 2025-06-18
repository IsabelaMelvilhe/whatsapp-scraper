const model = require("./model");

module.exports = {
  listar() {
    return model.findAll();
  },
  criar(dados) {
    return model.create(dados);
  },
  async existeMensagem(mensagem) {
    const msg = await model.findOne({
      where: {
        nome: mensagem.nome,
        mensagem: mensagem.mensagem,
        hora: mensagem.hora,
        tipo: mensagem.tipo,
      },
    });

    return msg ? true : false;
  },
};
