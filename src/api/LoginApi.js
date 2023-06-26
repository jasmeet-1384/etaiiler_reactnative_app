import { loginUrl } from './apiConstant'

export const loginFetch = async (phoneNumber) => {
    try {
        var data = {
            phoneNumber: phoneNumber
        }

        var response = await fetch(loginUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        var responseJson = await response.json()
        return responseJson
    } catch (err) {
        console.log(err, "<====== LOGIN PHONE NUMBER OTP")
    }
}