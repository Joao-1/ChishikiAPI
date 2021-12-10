module.exports = {
	up: async (queryInterface, Sequelize) => {
		queryInterface.addColumn("DiscordCommands", "description", { type: Sequelize.STRING, allowNull: false });
	},

	down: async (queryInterface) => {
		queryInterface.removeColumn("DiscordCommands", "description");
	},
};
