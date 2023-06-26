/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import PushNotification,{Importance} from "react-native-push-notification";
import AsyncStorage from '@react-native-async-storage/async-storage';


PushNotification.configure({
    onRegister: async function (token) {
        console.log("TOKEN:", token);
        await AsyncStorage.setItem('@fcmToken', token.token)
        await AsyncStorage.setItem('@os', token.os)
    },
    onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);

        // process the notification

        // (required) Called when a remote is received or opened, or local notification is opened

    },
    popInitialNotification: true
})
PushNotification.createChannel(
    {
        channelId: "channelLike", // (required)
        channelName: "My channel", // (required)
        channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
        playSound: false, // (optional) default: true
        soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
        importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
    },
    (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
);
AppRegistry.registerComponent(appName, () => App);
