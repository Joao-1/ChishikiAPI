module.exports = {
	up: async (queryInterface, Sequelize) => {
		queryInterface.createTable("DiscordServerCommands", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			DiscordServerId: {
				type: Sequelize.STRING,
				allowNull: false,
				references: {
					model: "DiscordServers",
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			DiscordCommandId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "DiscordCommands",
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			localStatus: {
				type: Sequelize.STRING,
				default: "disabled",
			},
		});
	},

	down: async (queryInterface) => {
		queryInterface.dropTable("DiscordServerCommands");
	},
};
