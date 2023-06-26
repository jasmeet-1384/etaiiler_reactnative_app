import AsyncStorage from '@react-native-async-storage/async-storage'
import { getAllUsers } from './apiConstant'

export const getAllUsersFetch = async () => {
    try {

        var response = await fetch(getAllUsers, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        var responseJson = await response.json()
        return responseJson
    } catch (err) {
        console.log(err, "<====== GET ALL POSTS")
    }
}
