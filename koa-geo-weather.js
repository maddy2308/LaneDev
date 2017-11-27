const request = require('request-promise');
module.exports = function geo_weather(ip, weatherAppId) {
    return async function geo_weather(ctx, next) {
        ip = ip || '';
        ctx.request.appId = weatherAppId;

        const options = {
            method: `GET`
            , json: true
            , uri: `http://ip-api.com/json/` + ip
        };
        let response = await request(options);
        if (response.status === 'fail') {
            throw new Error("Invalid Ip Address" + response);
        } else {
            ctx.request.lat = response.lat;
            ctx.request.lon = response.lon;
            ctx.body = await weather(ctx, next);
        }
    };

    async function weather(ctx, next) {

        const appID = 'appid=' + ctx.request.appId;
        const coordinates = `lat=` + ctx.request.lat + `&lon=` + ctx.request.lon;
        const options = {
            method: `GET`
            , json: true
            , uri: `http://api.openweathermap.org/data/2.5/forecast?` + coordinates + `&` + appID
        };
        let response = await request(options);

        await next();
        return response;
    }
};