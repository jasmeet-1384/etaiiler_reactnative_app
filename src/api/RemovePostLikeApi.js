import { removePostLike } from './apiConstant'

export const removePostLikeFetch = async (postId, user_id) => {
    try {
        var data = {
            postId: postId,
            user_id: user_id
        }

        var response = await fetch(removePostLike, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        var responseJson = await response.json()
        return responseJson
    } catch (err) {
        console.log(err, "<====== REMOVE POST LIKE API")
    }
}