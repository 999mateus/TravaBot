module.exports = {
    name: 'back',
    aliases: ['previous'],
    utilisation: '{prefix}back',
    voiceChannel: true,

    async execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`Nenhuma musica tocando ${message.author}... tentar denovo ? ❌`);

        if (!queue.previousTracks[1]) return message.channel.send(`Nenhuma musica tocada anteriormente  ${message.author}... tentar denovo ? ❌`);

        await queue.back();

        message.channel.send(`Tocando musica passada ✅`);
    },
};