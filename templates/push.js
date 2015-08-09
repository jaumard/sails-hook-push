/**
 * Push configuration
 *
 * This is the configuration for your Android iOS push notification setup and where you
 *
 */

module.exports.push = {
	gcm : {
		senderId : ""
	},
	apn : {
		cert : "",
		key  : ""
		/*
		 ca         : [],
		 pfx        : "",
		 passphrase : "",
		 production : NODE_ENV == "production",
		 voip : false,
		 port : 2195,
		 rejectUnauthorized : true,
		 cacheLength : 1000,
		 autoAdjustCache : true,
		 maxConnections : 1,
		 connectTimeout : 10000,
		 connectionTimeout : 3600000,
		 connectionRetryLimit : 10,
		 buffersNotifications : true,
		 fastMode : false
		 //more infos here : https://github.com/argon/node-apn/blob/master/doc/connection.markdown
		 */
	}
};
