import { getCommentUrl } from './apiConstant'

export const getCommentFetch = async (postId) => {
    try {
        var data = {
            postId: postId
        }

        var response = await fetch( getCommentUrl, {
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