import { SlashCommandBuilder, CommandInteraction } from "discord.js";
import { sleep } from "../utils";

const command = {
  data: new SlashCommandBuilder()
    .setName("exemple")
    .setDescription("Exemple slash command."),

  async execute(interaction: CommandInteraction) {
    try {
      await interaction.deferReply({ ephemeral: true });
      await sleep(2000); // Simulate a delay for processing
      await interaction.editReply({
        content: "Sending your message to the bot...",
      });
    } catch (error) {
      console.error("Exemple error:", error);
      await interaction.editReply({
        content:
          "Error: " + error,
      });
    }
  },
};

export default command;
