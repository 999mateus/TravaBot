const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'nowplaying',
    aliases: ['np'],
    utilisation: '{prefix}nowplaying',
    voiceChannel: true,

    execute(client, message) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`Nenhuma musica tocando ${message.author}... tentar denovo? ❌`);

        const track = queue.current;

        const embed = new MessageEmbed();

        embed.setColor('RED');
        embed.setThumbnail(track.thumbnail);
        embed.setAuthor(track.title, client.user.displayAvatarURL({ size: 1024, dynamic: true }));

        const methods = ['disabled', 'track', 'queue'];

        const timestamp = queue.getPlayerTimestamp();
        const trackDuration = timestamp.progress == 'Infinity' ? 'infinity (live)' : track.duration;

        embed.setDescription(`Volume **${queue.volume}**%\nDuração **${trackDuration}**\nLoop mode **${methods[queue.repeatMode]}**\nAdicionada por ${track.requestedBy}`);

        embed.setTimestamp();
        embed.setFooter('Stay Gold | made with love to my friends by Rochinha', message.author.avatarURL({ dynamic: true }));

        message.channel.send({ embeds: [embed] });
    },
};