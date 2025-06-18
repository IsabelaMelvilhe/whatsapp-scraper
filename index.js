const puppeteer = require("puppeteer");
const scrap = require("./src/scrap");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Router } = require("express");
const Mensagem = require("./src/routes/Mensagem");
const controller = require("./src/routes/controller");

const app = express();
const port = 3000;
app.use(cors());
app.use(bodyParser.json());

let page;
async function openBrowser() {
  const browser = await puppeteer.launch({ headless: false });
  page = await browser.newPage();
  await page.goto("https://web.whatsapp.com/");
}

openBrowser()
  .then(() => {
    scrap
      .run(page)
      .then(() => {
        console.log("Scraping completed.");
      })
      .catch((err) => {
        console.error("Error during scraping:", err);
      });
  })
  .catch((err) => {
    console.error("Error opening browser:", err);
  });

const router = Router();

router.get("/", controller.listAll);
router.post("/", async (req, res, next) => {
  try {
    await scrap.sendMessage(page, req.body);
    await controller.create(req, res, next);
  } catch (error) {
    console.error(error);
  }
});

app.use("/mensagens", router);

app.listen(port, () => console.log(`servidor está rodando na porta ${port}`));

module.exports = app;
