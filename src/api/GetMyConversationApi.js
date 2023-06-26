import AsyncStorage from '@react-native-async-storage/async-storage'
import { getMyConversationUrl } from './apiConstant'

export const getMyConversationFetch = async (from) => {
    try {
        var data = {
            from: from
        }
        var response = await fetch(getMyConversationUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        var responseJson = await response.json()
        return responseJson
    } catch (err) {
        console.log(err, "<====== GET MY CONVERSATION")
    }
}
