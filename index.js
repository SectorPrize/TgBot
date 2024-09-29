//const getFullName = require("https://code.jquery.com/jquery-3.7.1.min.js");
const TelegramApi = require("node-telegram-bot-api");
const { callbackQuery } = require("telegraf/filters");
const { inlineKeyboard } = require("telegraf/markup");
const URL_API = "https://www.cbr-xml-daily.ru/latest.js";

let result;
let obj;
let cny;

const token = ххх;

const bot = new TelegramApi(token, { polling: true });

bot.setMyCommands([
  { command: "/start", description: "Запустить сначала" },
  { command: "/info", description: "Информация" },
]);

const productOptios = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{ text: "Футболки / Шорты", callback_data: "futb" }],
      [{ text: "Толстовки / Штаны", callback_data: "tols" }],
      [{ text: "Верхняя одежда / Обувь", callback_data: "obuv" }],
      [{ text: "Нижнее белье / Носки", callback_data: "trus" }],
      [{ text: "Сумки / Рюкзаки", callback_data: "sumka" }],
    ],
  }),
};

const getData = async () => {
  obj = await fetch(URL_API);
  result = await obj.json();
  console.log(result.rates.CNY);
  cny = result.rates.CNY;
};

getData();

const start = () => {
  bot.on("message", (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;
    if (text === "/start") {
      return bot.sendMessage(
        chatId,
        `Выбери категорию товара, которую хочешь заказать.`,
        productOptios
      );
    }
    if (text === "/info") {
      return bot.sendMessage(
        chatId,
        `Доставляем товары напрямую из Китая. Для заказа пиши @RIPPLE_Zakaz.`
      );
    } /*else {
      return bot.sendMessage(ChatId, "Извини, не понимаю тебя");
    }*/
  });
};
//delete chatId;

bot.on("callback_query", (msg) => {
  //let price = 0;
  let data = msg.data;
  console.log(msg.data);
  const chatId = msg.message.chat.id;
  bot.sendMessage(chatId, "Введите стоимость вашей вещи в юанях");
  bot.on("message", async (msg) => {
    let sum = Number(msg.text);
    let price = 0;
    if (sum !== NaN) {
      if (sum > 0 && sum < 10000) {
        if (data == "futb") {
          price = 1000 + (1 / cny) * 1.17 * sum;
          console.log(data);
          console.log(msg.data);
          data = null;
          return bot.sendMessage(
            chatId,
            `Конечная стоимость товара вместе с доставкой составит в рублях ${price.toFixed(
              2
            )}`
          );
        } else if (data == "tols") {
          price = 1200 + (1 / cny) * 1.17 * sum;
          data = null;
          return bot.sendMessage(
            chatId,
            `Конечная стоимость товара вместе с доставкой составит в рублях ${price.toFixed(
              2
            )}`
          );
        } else if (data == "obuv") {
          price = 1600 + (1 / cny) * 1.17 * sum;
          data = null;
          return bot.sendMessage(
            chatId,
            `Конечная стоимость товара вместе с доставкой составит в рублях ${price.toFixed(
              2
            )}`
          );
        } else if (data == "trus") {
          price = 800 + (1 / cny) * 1.17 * sum;
          data = null;
          return bot.sendMessage(
            chatId,
            `Конечная стоимость товара вместе с доставкой составит в рублях ${price.toFixed(
              2
            )}`
          );
        } else if (data == "sumka") {
          price = 1400 + (1 / cny) * 1.17 * sum;
          data = null;
          return bot.sendMessage(
            chatId,
            `Конечная стоимость товара вместе с доставкой составит в рублях ${price.toFixed(
              2
            )}`
          );
        } else if (data !== null && sum == NaN) {
          return bot.sendMessage(chatId, "Извини, не понимаю тебя");
        }
      }
    }
  });
  return console.log("конец цикла");
});

//return delete data, console.log("конец цикла"), console.log(data);

start();
