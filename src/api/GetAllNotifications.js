import AsyncStorage from '@react-native-async-storage/async-storage'
import { getNotificationsUrl } from './apiConstant'

export const getNotificationsFetch = async (user_id,role) => {
    try {
        var data = {
            user_id: user_id,
            role : role
        }
        var response = await fetch(getNotificationsUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        var responseJson = await response.json()
        return responseJson
    } catch (err) {
        console.log(err, "<====== GET ALL NOTIFICATIONS")
    }
}
