import { updateTokenUrl } from './apiConstant'

export const updateTokenFetch = async (id, token, os, role) => {
    try {
        var data = {
            id: id,
            token: token,
            os: os,
            role: role
        }

        var response = await fetch(updateTokenUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        var responseJson = await response.json()
        return responseJson
    } catch (err) {
        console.log(err, "<====== updateToken API")
    }
}