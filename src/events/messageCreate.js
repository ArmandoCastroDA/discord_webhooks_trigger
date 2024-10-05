const { MessageEmbed, Interaction, MessageManager } = require('discord.js');
const fs = require('fs'); // Aqui está a importação do fs
const axios = require('axios'); // Importa o axios
require('dotenv').config(); // Carregando as variáveis de ambiente

module.exports = {
    name: "messageCreate",
    once: false,
    async execute(message) {
        // Verifique se a mensagem foi enviada por um bot, caso sim, ignore
        if (message.author.bot) return;

        // Enviar os dados para o webhook
        try {
            await axios.post(process.env.WEBHOOK_URL, { embeds: [message] }); // Envia a mensagem como um embed
            console.log('Mensagem enviada para o webhook com sucesso.');
        } catch (err) {
            console.error('Erro ao enviar a mensagem para o webhook:', err);

            // Enviar uma mensagem de erro para o canal de logs
            const logChannel = message.guild.channels.cache.find(channel => channel.id === process.env.CHANNEL_LOGS);
            if (logChannel) {
                logChannel.send(`🚨 Erro ao enviar a mensagem para o webhook: \`${err.message}\``)
                    .catch(err => console.error('Erro ao enviar mensagem para o canal de logs:', err));
            } else {
                console.error('Canal de logs não encontrado.');
            }
        }
    },
};
