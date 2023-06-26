import AsyncStorage from '@react-native-async-storage/async-storage'
import { getAllBusinessUrl } from './apiConstant'

export const getAllBusinessFetch = async () => {
    try {

        var response = await fetch(getAllBusinessUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        var responseJson = await response.json()
        return responseJson
    } catch (err) {
        console.log(err, "<====== GET ALL BUSINESS")
    }
}
