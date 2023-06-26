import { addCommentUrl } from './apiConstant'

export const addCommentFetch = async (user_id, postId, text, role) => {
    try {
        var data = {
            user_id: user_id,
            postId: postId,
            text: text,
            role: role
        }

        var response = await fetch(addCommentUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        var responseJson = await response.json()
        return responseJson
    } catch (err) {
        console.log(err, "<====== ADD COMMENT API")
    }
}