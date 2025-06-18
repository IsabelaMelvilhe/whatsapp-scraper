const model = require("../routes/model");

async function createTable() {
  try {
    await model.sync({ force: true });
    console.log("Tabela criada com sucesso!");
  } catch (error) {
    console.error("Erro ao criar tabela:", error);
  }
}

createTable();
