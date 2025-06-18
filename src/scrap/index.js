const Mensagem = require("../routes/Mensagem");

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = {
  async run(page) {
    try {
      const button = await page.waitForSelector(
        "#app > div > span:nth-child(3) > div > div > div > div > div > div > div > div > button",
        { timeout: 60000 }
      );
      await button.click();
    } catch (err) {
      console.log("Botão inicial não apareceu");
    }

    await delay(5000);

    await page.waitForSelector("#pane-side", { timeout: 60000 });
    const contatos = await page.$$("#pane-side > div > div > div > div");

    if (contatos.length > 1) {
      await contatos[0].click();
    }

    let mensagens = [];

    for (let i = 0; i < contatos.length; i++) {
      const contato = contatos[i];

      try {
        await contato.click();
        await delay(5000);

        await page.waitForSelector("div.copyable-text", { timeout: 20000 });

        const nome = await page.$$eval(
          "header > div:nth-of-type(2) span",
          (elements) => elements.map((el) => el.textContent)
        );
        await delay(3000);

        const mensagensContato = await page.$$eval(
          "div.message-in, div.message-out",
          (elements) =>
            elements.map((el) => {
              const div = el.querySelector("div.copyable-text");
              const tipo = el.classList.contains("message-in")
                ? "recebida"
                : "enviada";
              const spans = div.querySelectorAll("span");
              const texto =
                spans.length > 1
                  ? spans[1].textContent
                  : spans[0]?.textContent || "";
              const hora = spans.length > 2 ? spans[2].textContent : "";
              return {
                mensagem: texto,
                hora: hora,
                tipo: tipo,
              };
            })
        );

        mensagens = [
          ...mensagens,
          ...mensagensContato.map((m) => ({ ...m, nome: nome[0] })),
        ];

        console.log(
          `Capturadas ${mensagensContato.length} mensagens de ${nome[0]}`
        );
      } catch (erro) {
        console.log(`Erro ao processar contato ${i}: ${erro.message}`);
      }
    }

    for (let i = 0; i < mensagens.length; i++) {
      console.log(mensagens[i]);
      try {
        const novaMensagem = new Mensagem(mensagens[i]);
        await novaMensagem.validar();
        await novaMensagem.criar();
      } catch (error) {
        console.log(`Erro ao salvar mensagem: ${error.message}`);
      }
    }
  },

  async sendMessage(page, mensagem) {
    try {
      const novaMensagem = new Mensagem(mensagem);
      await novaMensagem.validar();
      await page.waitForSelector(`span[title="${mensagem.nome}"]`, {
        timeout: 10000,
      });
      await page.click(`span[title="${mensagem.nome}"]`);
      await delay(5000);
      const input = await page.waitForSelector(
        'div[contenteditable="true"][data-tab="10"]',
        { timeout: 10000 }
      );
      await input.focus();
      await page.keyboard.type(mensagem.mensagem);
      await delay(5000);
      const sendButton = await page.waitForSelector(
        'button[aria-label="Enviar"]',
        { timeout: 10000 }
      );
      if (sendButton) {
        await sendButton.click();
      } else {
        console.log(" Botão de envio não encontrado");
      }
    } catch (error) {
      console.error(`Erro ao enviar mensagem: ${error.message}`);
    }
  },
};
