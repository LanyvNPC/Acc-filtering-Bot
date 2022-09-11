"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BetterClient = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const discord_js_1 = require("discord.js");
require("./modules/registerSlash");
class BetterClient extends discord_js_1.Client {
    constructor() {
        super({
            intents: discord_js_1.GatewayIntentBits.Guilds
        });
        this.commands = new discord_js_1.Collection();
    }
    start(token) {
        this.registerCommands();
        this.login(token);
    }
    registerCommands() {
        return __awaiter(this, void 0, void 0, function* () {
            const commands = [];
            const commandFiles = yield promises_1.default.readdir(path_1.default.join(__dirname, "/commands"));
            yield Promise.all(commandFiles.map((file) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                if (file.endsWith(".ts") || file.endsWith(".js")) {
                    const command = yield Promise.resolve().then(() => __importStar(require(`./commands/${file}`)));
                    this.commands.set((_a = command.default) === null || _a === void 0 ? void 0 : _a.data.name, command);
                    commands.push(command);
                }
            })));
            this.on("interactionCreate", (interaction) => __awaiter(this, void 0, void 0, function* () {
                if (!interaction.isChatInputCommand())
                    return;
                const command = this.commands.get(interaction.commandName);
                if (!command)
                    return;
                try {
                    yield command.default.run(interaction, this);
                }
                catch (error) {
                    const embed = new discord_js_1.EmbedBuilder()
                        .setTitle("Error!")
                        .setDescription(`${String(error) || "Unexpected error occured!"}`)
                        .setTimestamp()
                        .setColor("Red");
                    yield interaction.reply({ embeds: [embed], ephemeral: true });
                }
            }));
        });
    }
}
exports.BetterClient = BetterClient;
