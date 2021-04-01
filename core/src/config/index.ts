module.exports = {
  tg: {
    token: process.env.TG_TOKEN,
    channel: process.env.TG_CHANNEL,
  },
  rabbit: {
    pass: process.env.RABBITMQ_PASS,
    user: process.env.RABBITMQ_USER,
  }
};
