const mcStat = require('minecraft-server-status');
const isPortReachable = require('is-port-reachable');
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TG_TOKEN;
const channel = process.env.TG_CHANNEL;
const ipsPerSecond = process.env.IPS_PER_SECOND || 1000;


const bot = new TelegramBot(token, {});

const formatModt = (m: string) => m.replace(/§\w/g, "")


const checkRandomIp = async () => {
  const a = Math.floor(Math.random() * 255) + 1;
  const b = Math.floor(Math.random() * 256);
  const c = Math.floor(Math.random() * 256);
  const d = Math.floor(Math.random() * 256);
  if (127 === a) return;
  const ip = `${a}.${b}.${c}.${d}`;
  const isOpen = await isPortReachable(25565, { host: ip })

  if (isOpen) {
    mcStat(ip, 25565, (serverData) => {
      if (serverData?.online) sendMessage(ip, serverData);
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
