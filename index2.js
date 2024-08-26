bot.on("callback_query", (msg) => {
  let data = msg.data;
  const chatId = msg.message.chat.id;
  console.log(data);
  bot.sendMessage(chatId, "Введите стоимость вашей вещи в юанях");
  return bot.on("message", (msg) => {
    let sum = Number(msg.text);
    let price = 0;
    let data = msg.text;
    console.log(data);
    if (sum !== NaN) {
      if (sum > 0 && sum < 10000) {
        if (data == "futb") {
          let price = 0;
          price = 1050 + 12 * 1.1 * sum;
          return bot.sendMessage(
            chatId,
            `Конечная стоимость товара вместе с доставкой составит в рублях ${price.toFixed(
              2
            )}`
          );
        }
      }
      if (data == "tols") {
        price = 1200 + 12 * 1.1 * sum;
        return bot.sendMessage(
          chatId,
          `Конечная стоимость товара вместе с доставкой составит в рублях ${price.toFixed(
            2
          )}`
        );
      }
      if (data == "obuv") {
        price = 1600 + 12 * 1.1 * sum;
        return bot.sendMessage(
          chatId,
          `Конечная стоимость товара вместе с доставкой составит в рублях ${price.toFixed(
            2
          )}`
        );
      }
      if (data == "trus") {
        /*if (sum == NaN) {
            bot.sendMessage(chatId, "Извини, не понимаю тебя");
          } else {*/
        price = 850 + 12 * 1.1 * sum;
        return bot.sendMessage(
          chatId,
          `Конечная стоимость товара вместе с доставкой составит в рублях ${price.toFixed(
            2
          )}`
        );
      }
      //});
    }
  });
});
/*bot.on("message", (msg) => {
    bot.sendMessage("Введите стоимость вашей вещи в юанях");
    const sum = msg.text;
    console.log(sum);
  });*/

/*let price;
  if (data == "futb") {
    price = 1050 + 12 * 1.1 + Number(sum);
  }
  console.log(price);
  /*bot.on("message", (msg) => {
    bot.sendMessage("Введите стоимость вашей вещи в юанях");
   
    //bot.sendMessage(chatId, data);
  });*/

/*if (data == "futb")
      {
   let price;
        price = 1050+(12)*1.1 + 
      }*/
start(); /*
  
  //t.me/Ripple_calc_bot
  
  /*function getData() {
    $.getJSON(URL_API, function (data) {
      console.log(data);
    });
  }*/
/*const getData = async () => {
    const obj = await fetch(URL_API);
    const result = await obj.json();
    console.log(result[0]);
  };
  getData();
  */
