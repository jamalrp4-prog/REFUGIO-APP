require("dotenv").config();
const { 
  Client, 
  GatewayIntentBits, 
  ActionRowBuilder, 
  ButtonBuilder, 
  ButtonStyle, 
  EmbedBuilder 
} = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// 🔧 COLOQUE AQUI OS IDS DOS CARGOS DO SEU SERVIDOR
const ROLE_BR = "1521336344981409854";
const ROLE_ES = "1521336268787552276";

client.once("ready", () => {
  console.log(`🤖 Bot online como ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (message.content === "!idioma") {
    const embed = new EmbedBuilder()
      .setTitle("🌍 Escolha seu idioma")
      .setDescription("Clique em uma opção abaixo para receber seu cargo.")
      .setColor("Blue");

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("lang_br")
        .setLabel("Português 🇧🇷")
        .setStyle(ButtonStyle.Success),

      new ButtonBuilder()
        .setCustomId("lang_es")
        .setLabel("Español 🇪🇸")
        .setStyle(ButtonStyle.Danger)
    );

    await message.channel.send({ embeds: [embed], components: [row] });
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isButton()) return;

  const member = interaction.member;

  if (interaction.customId === "lang_br") {
    await member.roles.add(ROLE_BR);
    await interaction.reply({ content: "✅ Cargo Português adicionado!", ephemeral: true });
  }

  if (interaction.customId === "lang_es") {
    await member.roles.add(ROLE_ES);
    await interaction.reply({ content: "✅ Cargo Español adicionado!", ephemeral: true });
  }
});

client.login(process.env.TOKEN);
