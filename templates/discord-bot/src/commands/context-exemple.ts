import {
  ContextMenuCommandBuilder,
  ApplicationCommandType,
  ContextMenuCommandInteraction
} from "discord.js";
import { sleep } from "../utils";

const command = {
  data: new ContextMenuCommandBuilder()
    .setName("Context Command Example")
    .setType(ApplicationCommandType.Message),

  async execute(interaction: ContextMenuCommandInteraction) {
    if (!interaction.isMessageContextMenuCommand()) return;

    await interaction.deferReply({ ephemeral: true });
    await sleep(2000); // Simulate a delay for processing
    await interaction.editReply({
      content: `Sending your message to the bot...`,
    });
  },
};

export default command;
