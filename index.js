//const getFullName = require("https://code.jquery.com/jquery-3.7.1.min.js");
const TelegramApi = require("node-telegram-bot-api");
const { inlineKeyboard } = require("telegraf/markup");
const URL_API = "https://www.cbr-xml-daily.ru/latest.js";
let result;
let obj;
let cny;

//import { $, jQuery } from "jquery-3.7.1.min.js";

//window.$ = $;
//window.jQuery = jQuery;

//const { Telegraf } = require("telegraf");

/*const CNY =
    let toDay = JSON (URL_API, (data)
    console.log(data))
}*/

const token = "XXX";

const bot = new TelegramApi(token, { polling: true });

bot.setMyCommands([
  { command: "/start", description: "Запустить сначала" },
  { command: "/info", description: "Начало" },
]);

const productOptios = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{ text: "Футболки / Шорты", callback_data: "futb" }],
      [{ text: "Толстовки / Штаны", callback_data: "tols" }],
      [{ text: "Верхняя одежда / Обувь", callback_data: "obuv" }],
      [{ text: "Нижнее белье / Носки", callback_data: "trus" }],
    ],
  }),
};

//const chats = {};

/*bot.onText(/\/start/, (msg, match) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Приветик, " + msg.chat.first_name + "!");
  console.log(match);
  const text = msg.text;
  if (text === "/start") {
    return bot.sendMessage(
      chatId,
      `Привет ${msg.from.first_name}! Выбери категорию, которую хочешь заказать:`,
      productOptios
    );
  }
});
bot.onText(/\/info/, (msg, match) => {
  const chatId = msg.chat.id;
  console.log(match);
  bot.sendMessage(chatId, "информация");
});
bot.on("callback_query", (msg) => {
  let data = msg.data;
  //let price = 0;
  const chatId = msg.message.chat.id;

  console.log(data);
  bot.sendMessage(chatId, "Введите стоимость вашей вещи в юанях");
  return bot.on("message", (msg) => {
    let sum = Number(msg.text);
    let price = 0;
    //let data = msg.text;
    //console.log(data);
    if (sum !== null) {
      // if (sum > 0 && sum < 10000) {
      if (data == "futb") {
        price = 1050 + 12 * 1.1 * sum;
        return bot.sendMessage(
          chatId,
          `Конечная стоимость товара вместе с доставкой составит в рублях ${price.toFixed(
            2
          )}`
        );

        //}
      }
    }
  });
});
data = null;*/
const getData = async () => {
  obj = await fetch(URL_API);
  result = await obj.json();
  console.log(result.rates.CNY);
  cny = result.rates.CNY;
  //window.Cny = CnY;
};

getData();

const start = () => {
  bot.on("message", (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;
    if (text === "/start") {
      return bot.sendMessage(
        chatId,
        `Привет ${msg.from.first_name}! Выбери категорию, которую хочешь заказать:`,
        productOptios
      );
    }
    if (text === "/info") {
      return bot.sendMessage(chatId, `Доставляем товары напрямую из Китая`);
    } /*else {
      return bot.sendMessage(ChatId, "Извини, не понимаю тебя");
    }*/
  });
};

bot.on("callback_query", async (msg) => {
  let data = msg.data;
  //let price = 0;
  const chatId = msg.message.chat.id;
  console.log(msg.data);
  bot.sendMessage(chatId, "Введите стоимость вашей вещи в юанях");
  bot.on("message", async (msg) => {
    let sum = Number(msg.text);
    let price = 0;
    if (sum !== NaN) {
      if (sum > 0 && sum < 10000) {
        if (data == "futb") {
          price = 1050 + cny * 1.17 * sum;
          data = null;
          console.log(data);
          console.log(msg.data);
          return bot.sendMessage(
            chatId,
            `Конечная стоимость товара вместе с доставкой составит в рублях ${price.toFixed(
              2
            )}`
          );
        } else if (data == "tols") {
          price = 1200 + cny * 1.17 * sum;
          data = null;
          return bot.sendMessage(
            chatId,
            `Конечная стоимость товара вместе с доставкой составит в рублях ${price.toFixed(
              2
            )}`
          );
        } else if (data == "obuv") {
          price = 1600 + cny * 1.17 * sum;
          data = null;
          return bot.sendMessage(
            chatId,
            `Конечная стоимость товара вместе с доставкой составит в рублях ${price.toFixed(
              2
            )}`
          );
        } else if (data == "trus") {
          price = 850 + cny * 1.17 * sum;
          data = null;
          return bot.sendMessage(
            chatId,
            `Конечная стоимость товара вместе с доставкой составит в рублях ${price.toFixed(
              2
            )}`
          );
        }
      } else {
        return bot.sendMessage(chatId, "Извини, не понимаю тебя");
      }
    }
    return console.log("конец цикла");
  });
});

start();
