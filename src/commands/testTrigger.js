const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');  // Usaremos axios para a requisição HTTP
const { webhook_url } = require('../data/config.json');  // Importando a variável webhook_url

module.exports = {
    data: new SlashCommandBuilder()
        .setName('test-webhook')
        .setDescription("Test the webhook by sending a request to the webhook URL."),
    async execute(interaction) {
        try {
            // Fazendo a requisição POST para o webhook
            const response = await axios.post(webhook_url, {
                content: 'Webhook test from Discord bot!'  // O conteúdo enviado ao webhook
            });

            // Respondendo no Discord com o status da requisição
            return interaction.reply({
                content: `Webhook test successful! Response status: ${response.status}`,
                ephemeral: true
            });
        } catch (error) {
            console.error(error);

            // Respondendo no Discord caso haja um erro
            return interaction.reply({
                content: `Failed to send webhook. Error: ${error.message}`,
                ephemeral: true
            });
        }
    },
};
