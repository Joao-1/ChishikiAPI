module.exports = {
	up: async (queryInterface, Sequelize) => {
		queryInterface.createTable("DiscordCommands", {
			id: {
				primaryKey: true,
				allowNull: false,
				autoIncrement: true,
				type: Sequelize.INTEGER,
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
		});
	},

	down: async (queryInterface) => {
		queryInterface.dropTable("DiscordCommands");
	},
};
