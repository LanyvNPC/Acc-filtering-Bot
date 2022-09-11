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
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const rest_1 = require("@discordjs/rest");
const discord_js_1 = require("discord.js");
const config_json_1 = require("../config.json");
const clientId = Buffer.from(config_json_1.token.split(".")[0], "base64").toString("utf8");
const commands = [];
const rest = new rest_1.REST({ version: "10" }).setToken(config_json_1.token);
(() => __awaiter(void 0, void 0, void 0, function* () {
    const commandFiles = yield promises_1.default.readdir(path_1.default.join(__dirname, "../commands"));
    yield Promise.all(commandFiles.map((file) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        if (file.endsWith(".ts") || file.endsWith(".js")) {
            const command = yield Promise.resolve().then(() => __importStar(require(`../commands/${file}`)));
            commands.push((_a = command.default) === null || _a === void 0 ? void 0 : _a.data.toJSON());
        }
    })));
    try {
        yield rest.put(discord_js_1.Routes.applicationCommands(clientId), { body: commands });
    }
    catch (error) {
        throw error;
    }
}))();
