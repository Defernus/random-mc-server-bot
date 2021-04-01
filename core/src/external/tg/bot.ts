const TelegramBot = require("node-telegram-bot-api");
const config = require("../../config");

module.exports = new TelegramBot(config.tg.token, {});
