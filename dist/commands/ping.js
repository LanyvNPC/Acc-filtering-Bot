"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName("핑")
        .setDescription("퐁!"),
    run: (interaction, client) => __awaiter(void 0, void 0, void 0, function* () {
        const embed = new discord_js_1.EmbedBuilder()
            .setTitle("핑!")
            .setDescription(`퐁! **(${client.ws.ping}ms!)**`)
            .setTimestamp()
            .setColor("Green");
        yield interaction.reply({ embeds: [embed] });
    })
};
