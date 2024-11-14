const {ApplicationCommandOptionType} = require('discord.js');

module.exports = {
    name: 'ban',
    description: 'Ban a player',
    options: [
        {
            name: 'user',
            type: ApplicationCommandOptionType.User,
            description: 'The user you want to ban',
            required: true,
        },
    ],
    execute(interaction, client) {
        const member = interaction.options.getUser('user');

        if (!member) {
            return interaction.reply('Mention krr loo BSDK');
        }

        if (!interaction.member.permissions.has('BAN_MEMBERS')) {
            return interaction.reply("Mai nhi krr skti laode");
        }

        const userinfo = client.users.cache.getMember(member);

        return interaction.guild.members
            .ban(member)
            .then(() => {
                interaction.reply({
                    content: `${userinfo.username} was banned.`,
                    ephemeral: true,
                });
            })
            .catch(error =>
                interaction.reply({
                    content: `Sorry, an error occured.`,
                    ephemeral: true,
                }),
            );
    },
};
