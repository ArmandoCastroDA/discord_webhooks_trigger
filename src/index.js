const fs = require('fs');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { token } = require('./data/config.json');

// Atualizando as intenções para a nova forma
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences
    ]
});

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

// Evento que é chamado quando o bot está pronto
client.once('ready', () => {
    console.log(`Conexão com Discord estabelecida com sucesso!`);
    console.log(`Bot está online como: ${client.user.tag}`);
});

try {
    client.login(token);
} catch (err) {
    console.error(
        "Failed to login to Discord. This is usually because of an invalid TOKEN. Please double check that you have the correct token in 'data/config.json'."
    );
}
