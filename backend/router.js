const Router = require("koa-router");
const router = new Router();
const { getEvents } = require("./controllers/events.controllers");

router.get("/events_list", getEvents);

module.exports = router;
