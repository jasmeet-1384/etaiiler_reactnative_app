import AsyncStorage from '@react-native-async-storage/async-storage'
import { getMyMessagesUrl } from './apiConstant'

export const getMyMessagesFetch = async (conversation_id) => {
    try {
        var data = {
            conversation_id: conversation_id
        }
        var response = await fetch(getMyMessagesUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        var responseJson = await response.json()
        return responseJson
    } catch (err) {
        console.log(err, "<====== getMyMessages")
    }
}
