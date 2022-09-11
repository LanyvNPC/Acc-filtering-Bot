import { BetterClient } from "./Client";

import { token } from "./config.json";

import { limitDays } from "./config.json";

export const client = new BetterClient();

client.once("ready", () => {
    client.user?.setPresence({ activities: [{ name: "어카운트 필터링 봇!" }], status: "online" });
    console.log("Bot Started!");
});

client.on("guildMemberAdd", guildMember => {
    const userDate = guildMember.user?.createdAt.toLocaleDateString();
    const localeDate = new Date().toLocaleDateString();

    const day = new Date(userDate || localeDate);
    const today = new Date(localeDate);

    const differentDay = Math.abs((day.getTime() - today.getTime()) / (1000 * 3600 * 24));

    if (differentDay <= limitDays) {
        guildMember.kick("계정 생성일을 넘기지 못했습니다!");
    }
});

client.start(token);
