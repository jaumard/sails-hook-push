var fs = require('fs-extra');

var appDir = process.env.PWD;

//Config already exist so we don't override
if (!fs.existsSync(appDir + "/../../config/push.js"))
{
	//Copy base push config
	fs.copy(appDir + "/templates/push.js", appDir + "/../../config/push.js", function (err)
	{
		if (err)
		{
			console.log(err);
		}
		else
		{
			console.log("done write push.js base config");
		}
	});
}