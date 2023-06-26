import { passwordLoginInUrl } from './apiConstant'

export const passwordLoginFetch = async (phoneNumber, password) => {
    try {
        var data = {
            phoneNumber: phoneNumber,
            password: password
        }

        var response = await fetch(passwordLoginInUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        var responseJson = await response.json()
        return responseJson
    } catch (err) {
        console.log(err, "<====== LOGIN password NUMBER OTP")
    }
}