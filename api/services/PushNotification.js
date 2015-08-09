/**
 * Created by jaumard on 09/08/2015.
 */
module.exports = {
	/**
	 * Send a push message to one or more devices
	 * @param ids id or array of id to send push message
	 * @param messageInfos parameter and message to send see https://github.com/ToothlessGear/node-gcm#usage for more information
	 * @param retry when message fail to send
	 * @param next callback
	 */
	sendGCMNotification : function (ids, messageInfos, retry, next)
	{
		var gcm = require('node-gcm');
		var _ = require('lodash');

		if (!Array.isArray(ids))
		{
			ids = [ids];
		}

		ids = _.chunk(ids, 1000);

		var message;
		if (messageInfos)
		{
			message = new gcm.Message(messageInfos);
		}
		else
		{
			message = new gcm.Message();
		}
		// Set up the sender with you API key
		var sender = new gcm.Sender(sails.config.push.gcm.senderId);

		for (var i = 0; i < ids.length; i++)
		{
			var obj = ids[i];

			if (retry === true)
			{
				sender.send(message, obj, function (err, result)
				{
					next(err, result);
				});
			}
			else if (retry === false)
			{
				sender.sendNoRetry(message, obj, function (err, result)
				{
					next(err, result);
				});
			}
			else
			{
				sender.send(message, obj, retry, function (err, result)
				{
					next(err, result);
				});
			}
		}
	},
	/**
	 * Send a push message to one or more Apple devices
	 * @param token or array or tokens to send push message
	 * @param message object to send, more information on parameters here https://developer.apple.com/library/ios/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/Chapters/ApplePushService.html#//apple_ref/doc/uid/TP40008194-CH100-SW1
	 * TODO not tested yet !
	 */
	sendAPNNotification : function (token, message)
	{
		var apn     = require('apn');
		var _ = require('lodash');
		var options = sails.config.push.apn;

		if (!Array.isArray(token))
		{
			token = [token];
		}

		var apnConnection = new apn.Connection(options);

		var note = new apn.Notification();
		note  = _.merge(note, message);

		for (var i = 0; i < token.length; i++)
		{
			var obj      = token[i];
			var myDevice = new apn.Device(obj);
			apnConnection.pushNotification(note, myDevice);
		}
	}
};