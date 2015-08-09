/**
 * Created by jaumard on 09/08/2015.
 */
module.exports = {
	sendGCMNotification : function (ids, messageInfos, retry, next)
	{
		var gcm = require('node-gcm');

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
	sendAPNNotification : function (token, message)
	{
		var apn     = require('apn');
		var options = sails.config.push.apn;

		if (!Array.isArray(token))
		{
			token = [token];
		}

		var apnConnection = new apn.Connection(options);

		var note = new apn.Notification();

		if (message.expiry)
		{
			note.expiry = message.expiry;
		}
		if (message.badge)
		{
			note.badge = message.badge;
		}
		if (message.badge)
		{
			note.badge = message.badge;
		}
		if (message.sound)
		{
			note.sound = message.sound;
		}
		if (message.alert)
		{
			note.alert = message.alert;
		}
		if (message.payload)
		{
			note.payload = message.payload;
		}

		for (var i = 0; i < token.length; i++)
		{
			var obj      = token[i];
			var myDevice = new apn.Device(obj);
			apnConnection.pushNotification(note, myDevice);
		}

	}
};