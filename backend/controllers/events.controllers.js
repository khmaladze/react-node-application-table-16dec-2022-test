const data = require("../data.json");

const getEvents = (ctx) => {
  ctx.body = data;
  ctx.status = 200;
};

module.exports = {
  getEvents,
};
