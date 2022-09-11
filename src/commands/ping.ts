import { SlashCommandBuilder, CommandInteraction, Client, EmbedBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("핑")
        .setDescription("퐁!"),
    run: async (interaction: CommandInteraction, client: Client) => {
        const embed = new EmbedBuilder()
            .setTitle("핑!")
            .setDescription(`퐁! **(${client.ws.ping}ms!)**`)
            .setTimestamp()
            .setColor("Green");

        await interaction.reply({ embeds: [embed] });
    }
};
