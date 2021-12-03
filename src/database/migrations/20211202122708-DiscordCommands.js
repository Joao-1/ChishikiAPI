module.exports = {
	up: async (queryInterface, Sequelize) => {
		queryInterface.createTable("DiscordCommands", {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.STRING,
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			type: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			globalStatus: {
				type: Sequelize.STRING,
				default: "disabled",
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},

	down: async (queryInterface) => {
		queryInterface.dropTable("DiscordCommands");
	},
};
