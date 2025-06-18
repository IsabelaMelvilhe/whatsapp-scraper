const Sequelize = require("sequelize");
const instance = require("../db");

const colunas = {
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  mensagem: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  hora: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  tipo: {
    type: Sequelize.STRING,
    allowNull: false,
  },
};
const opcoes = {
  tableName: "mensagens",
  timestamps: true,
  freezeTableName: true,
};

module.exports = instance.define("mensagem", colunas, opcoes);
