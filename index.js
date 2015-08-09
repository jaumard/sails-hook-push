module.exports = function (sails)
{
	//Override http config here before hook initialisation
	var hookLoader = require('sails-util-mvcsloader')(sails);
	/*
	 hookLoader.injectAll({
	 policies : __dirname + '/api/policies',// Path to your hook's policies
	 config   : __dirname + "/config"// Path to your hook's config
	 });
	 */

	return {
		defaults : {
			passport : {}
		},

		initialize : function (cb)
		{
			hookLoader.injectAll({
				services : __dirname + '/api/services' // Path to your hook's services
			}, function (err)
			{
				if (!err)
				{

				}
				return cb(err);
			});

		}
	};
};