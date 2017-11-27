const router = require('koa-router')();
const Fakerator = require("fakerator");
const fakerator = Fakerator();

const koaGeoWeather = require('./koa-geo-weather');

const Koa = require('koa');
const app = module.exports = new Koa();

// route definitions
router.get("/my_weather", koaGeoWeather(fakerator.internet.ip(), 'dbcd9808e13b210eccd8cfd8fd668105'));
app.use(router.routes());

const greetings = async (ctx, next) => {
    ctx.body = 'Hello.';
    await next();
    ctx.body += ' Remember to subscribe.';
};

// listen
if (!module.parent) app.listen(3000);
console.log("The server is running on port 3000");


