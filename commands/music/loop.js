const { QueueRepeatMode } = require('discord-player');

module.exports = {
    name: 'loop',
    aliases: ['lp', 'repeat'],
    utilisation: '{prefix}loop <queue>',
    voiceChannel: true,

    execute(client, message, args) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`Nenhuma musica tocando ${message.author}... tentar denovo? ❌`);

        if (args.join('').toLowerCase() === 'queue') {
            if (queue.repeatMode === 1) return message.channel.send(`Você deve primeiro desativar a música atual no modo de loop (${client.config.app.px}loop) ${message.author}... tentar denovo ? ❌`);

            const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.QUEUE : QueueRepeatMode.OFF);

            return message.channel.send(success ? `Repeat mode **${queue.repeatMode === 0 ? 'desativado' : 'ativado'}** a fila ira se repetir 🔁` : `Algo de errado aconteceu ${message.author}... tentar denovo ? ❌`);
        } else {
            if (queue.repeatMode === 2) return message.channel.send(`Você deve primeiro desativar a música atual no modo de loop (${client.config.app.px}loop queue) ${message.author}... tentar denovo ? ❌`);

            const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.TRACK : QueueRepeatMode.OFF);

            return message.channel.send(success ? `Repeat mode **${queue.repeatMode === 0 ? 'desativado' : 'ativado'}** a música atual será repetida (você pode fazer um loop na fila com a opção <queue>) 🔂` : `Algo de errado aconteceu ${message.author}... tentar denovo ? ❌`);
        };
    },
};