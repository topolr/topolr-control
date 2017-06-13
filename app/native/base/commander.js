var pipe=require("./pipe");
[
	require("./command/projectlist"),
	require("./command/browsefolder"),
	require("./command/addproject"),
	require("./command/removeproject"),
	require("./command/startserver"),
	require("./command/stopserver")
].forEach(function(a){
	pipe.listen(a.command,a.trigger);
});