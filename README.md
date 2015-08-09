# sails-hook-push 

Base on node-gcm and apn modules.

## Install : 

    npm install sails-hook-push
    
## Usage : 
After install a new service is available. You can send GCM message/notification like this : 

    sails.services.pushnotification.sendGCMNotification("DEVICE_TOKEN", {
        data         : {
          key1 : 'message1',
          key2 : 'message2'
        },
        notification: {
          title: "Hello, World",
          icon: "ic_launcher",
          body: "This is a notification that will be displayed ASAP."
        }
      }, true, function (err, results)
      {
        console.log(err, results);
      });
More informations about parameters here : https://github.com/ToothlessGear/node-gcm#usage
      
For an APN notification : 

    sails.services.pushnotification.sendAPNNotification("DEVICE_TOKEN", {
        badge : 3,
        sound : "ping.aiff",
        alert : "new message",
        payload : {'messageFrom': 'Caroline'}
    });
More informations about parameters here : https://github.com/argon/node-apn#sending-a-notification
   
You can use sails.services.pushnotification or PushNotification if you have global services option enable on your sails project.