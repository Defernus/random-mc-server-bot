const mcStat = require('minecraft-server-status');
const isPortReachable = require('is-port-reachable');
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TG_TOKEN;
const channel = process.env.TG_CHANNEL;
const ipsPerSecond = process.env.IPS_PER_SECOND || 5000;


const bot = new TelegramBot(token, {});

const formatModt = (m: string) => m.replace(/§\w/g, "")

const sendMessage = async (ip: string, port: number, { server, players, motd, favicon }) => {
  const message = `
    ${ip}\n${formatModt(motd)} (${server.name})
    players: ${players.now}/${players.max}
    
  `;
  console.log(message);
  bot.sendMessage(channel, message);
};

const checkRandomIp = async () => {
  const a = Math.floor(Math.random() * 255) + 1;
  const b = Math.floor(Math.random() * 256);
  const c = Math.floor(Math.random() * 256);
  const d = Math.floor(Math.random() * 256);
  if (127 === a) return;
  const ip = `${a}.${b}.${c}.${d}`;
  const port = 25565;
  const isOpen = await isPortReachable(port, { host: ip })

  if (isOpen) {
    console.log(`${ip}:${port}`);
    mcStat(ip, port, (serverData) => {
      if (serverData?.online && serverData.players?.now !== 0) sendMessage(ip, port, serverData);
    });
  }
}


(async () => {
  for (;;) {
    const results = [];
    for (let i = 0; i != ipsPerSecond; ++i) {
        results.push(checkRandomIp());
    }
    await Promise.all(results);
  }
})();

