const SteamUser = require('steam-user');
var client = new SteamUser();

if (!fs.existsSync(path)) {
    console.error("Missing credentials.json file");
    process.exit(1);
}
let content = JSON.parse(fs.readFileSync("credentials.json", "utf8"));

client.logOn({
	"accountName": content.username,
	"password": content.password
});

client.on('loggedOn', function(details) {
	console.log("Logged into Steam as " + client.steamID.getSteam3RenderedID());
	client.setPersona(SteamUser.EPersonaState.Online);
});

client.on('error', function(e) {
    console.error("An error occured: " + e);
    process.exit(1);
});