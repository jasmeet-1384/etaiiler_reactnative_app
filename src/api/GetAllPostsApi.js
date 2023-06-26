import AsyncStorage from '@react-native-async-storage/async-storage'
import { getAllHomePostsUrl, getAllPostsUrl } from './apiConstant'
import { getOwnPostsUrl } from './apiConstant'

export const getAllPostsFetch = async () => {
    try {

        var response = await fetch(getAllPostsUrl, {
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
export const getAllHomePostsFetch = async () => {
    try {

        var response = await fetch(getAllHomePostsUrl, {
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

export const getOwnPostsFetch = async (id) => {
    try {

        const data = {
            // user_id: await AsyncStorage.getItem('_id')
            user_id: id
        }

        var response = await fetch(getOwnPostsUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        var responseJson = await response.json()
        return responseJson
    } catch (err) {
        console.log(err, "<====== GET OWN POSTS")
    }
}