module.exports = {
    name: 'filtro',
    aliases: [],
    utilisation: '{prefix}filtro [filtro name]',
    voiceChannel: true,

    async execute(client, message, args) {
        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`Nenhuma musica tocando ${message.author}... tentar denovo? ❌`);

        const actualFilter = queue.getFiltersEnabled()[0];

        if (!args[0]) return message.channel.send(`Especifique um filtro para ativar ou desativar ${message.author}... tentar denovo ? ❌\n${actualFilter ? `Filtro ativo ${actualFilter} (${client.config.app.px}filtro ${actualFilter} para desativar).\n` : ''}`);

        const filters = [];

        queue.getFiltersEnabled().map(x => filters.push(x));
        queue.getFiltersDisabled().map(x => filters.push(x));

        const filter = filters.find((x) => x.toLowerCase() === args[0].toLowerCase());

        if (!filter) return message.channel.send(`Esse filtro nao existe ${message.author}... tentar denovo ? ❌\n${actualFilter ? `Filtro ativo ${actualFilter}.\n` : ''}Lista de filtros disponiveis ${filters.map(x => `**${x}**`).join(', ')}.`);

        const filtersUpdated = {};

        filtersUpdated[filter] = queue.getFiltersEnabled().includes(filter) ? false : true;

        await queue.setFilters(filtersUpdated);

        message.channel.send(`O filtro ${filter} agora esta **${queue.getFiltersEnabled().includes(filter) ? 'ativado' : 'desativado'}** ✅\n*`);
    },
};