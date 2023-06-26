import { addChatUrl } from './apiConstant'

export const addChatFetch = async (from, to, message) => {
    try {
        var data = {
            from: from,
            to: to,
            message: message
        }

        var response = await fetch(addChatUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        var responseJson = await response.json()
        return responseJson
    } catch (err) {
        console.log(err, "<====== ADD CHAT API")
    }
}