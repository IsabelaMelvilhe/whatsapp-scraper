const service = require("./service");

class Mensagem {
  constructor({ nome, mensagem, hora, tipo }) {
    this.nome = nome;
    this.mensagem = mensagem;
    this.hora = hora;
    this.tipo = tipo;
  }

  async listar() {
    try {
      return await service.listar();
    } catch (error) {
      throw new Error(`Erro ao listar mensagens: ${error.message}`);
    }
  }

  async criar() {
    try {
      return await service.criar({
        nome: this.nome,
        mensagem: this.mensagem,
        hora: this.hora,
        tipo: this.tipo,
      });
    } catch (error) {
      throw new Error(`Erro ao criar mensagem: ${error.message}`);
    }
  }
  async validar() {
    if (!this.nome || !this.mensagem || !this.hora || !this.tipo) {
      throw new Error("Todos os campos são obrigatórios");
    }
    await service
      .existeMensagem(this)
      .then((existe) => {
        if (existe) {
          throw new Error("Mensagem já existe");
        }
      })
      .catch((error) => {
        throw new Error(`Erro ao validar mensagem: ${error.message}`);
      });
  }
}
module.exports = Mensagem;
