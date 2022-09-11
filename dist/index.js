"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const Client_1 = require("./Client");
const config_json_1 = require("./config.json");
const config_json_2 = require("./config.json");
exports.client = new Client_1.BetterClient();
exports.client.once("ready", () => {
    var _a;
    (_a = exports.client.user) === null || _a === void 0 ? void 0 : _a.setPresence({ activities: [{ name: "어카운트 필터링 봇!" }], status: "online" });
    console.log("Bot Started!");
});
exports.client.on("guildMemberAdd", guildMember => {
    var _a;
    const userDate = (_a = guildMember.user) === null || _a === void 0 ? void 0 : _a.createdAt.toLocaleDateString();
    const localeDate = new Date().toLocaleDateString();
    const day = new Date(userDate || localeDate);
    const today = new Date(localeDate);
    const differentDay = Math.abs((day.getTime() - today.getTime()) / (1000 * 3600 * 24));
    if (differentDay <= config_json_2.limitDays) {
        guildMember.kick("계정 생성일을 넘기지 못했습니다!");
    }
});
exports.client.start(config_json_1.token);
