module.exports = {
    name: 'pause',
    aliases: [],
    utilisation: '{prefix}pause',
    voiceChannel: true,

    execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        if (!queue) return message.channel.send(`Nenhuma musica tocando ${message.author}... tentar denovo? ❌`);

        const success = queue.setPaused(true);

        return message.channel.send(success ? `Musica atual ${queue.current.title} pausada ✅` : `Algo de errado aconteceu  ${message.author}... tentar denovo ? ❌`);
    },
};