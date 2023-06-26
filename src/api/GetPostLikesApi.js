import { getPostLike , getAllPostLikes } from './apiConstant'

export const getPostLikeFetch = async (postId) => {
    try {
        var data = {
            postId: postId
        }

        var response = await fetch(getPostLike, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        var responseJson = await response.json()
        return responseJson
    } catch (err) {
        console.log(err, "<====== GET POST LIKE API")
    }
}

export const getAllPostLikesFetch = async () => {
    try {

        var response = await fetch(getAllPostLikes, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        var responseJson = await response.json()
        return responseJson
    } catch (err) {
        console.log(err, "<====== GET ALL POST LIKE API")
    }
}