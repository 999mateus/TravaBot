module.exports = {
    name: 'clear',
    aliases: ['cq'],
    utilisation: '{prefix}clear',
    voiceChannel: true,

    async execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`Nenhuma musica tocando ${message.author}... tentar denovo? ? ❌`);

        if (!queue.tracks[0]) return message.channel.send(`Nenhuma musica na fila após essa ${message.author}... tentar denovo ? ❌`);

        await queue.clear();

        message.channel.send(`A fila foi limpa 🗑️`);
    },
};