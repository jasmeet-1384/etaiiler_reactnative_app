import { addPostLike } from './apiConstant'

export const addPostLikeFetch = async (postId, user_id,role) => {
    try {
        var data = {
            postId: postId,
            user_id: user_id,
            role: role
        }

        var response = await fetch(addPostLike, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        var responseJson = await response.json()
        return responseJson
    } catch (err) {
        console.log(err, "<====== ADD POST LIKE API")
    }
}