const TelegramBot = require('node-telegram-bot-api');

const sendMessage = async (ip: string, { server, players, motd, favicon }) => {
  const message = `
    ${ip}\n${formatModt(motd)} (${server.name})
    players: ${players.now}/${players.max}
    
  `;
  console.log(message);
  bot.sendMessage(channel, message);
};