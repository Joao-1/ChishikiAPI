// import DiscordCommands from "./models/DiscordCommands";
// import DiscordServerCommands from "./models/DiscordServerCommands";
// import DiscordServers from "./models/DiscordServers";

// (async () => {
// 	const newDiscordServer = await DiscordServers.create({ id: "12234a4322" });
// 	await DiscordCommands.create({ id: "123", name: "a", type: "global" });
// 	const here = await newDiscordServer.$add("commands", "123");
// 	const two = await DiscordServerCommands.update(
// 		{ localStatus: "ativo" },
// 		{ where: { DiscordServerId: newDiscordServer.id, DiscordCommandId: "283" } }
// 	);
// 	console.log(two);
// })();
