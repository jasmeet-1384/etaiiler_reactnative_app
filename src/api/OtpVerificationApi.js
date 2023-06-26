import { otpVerification } from './apiConstant'

export const otpVerificationFetch = async (phoneNumber,otp) => {
    try {
        var data = {
            phoneNumber:phoneNumber,
            otp: otp
        }

        var response = await fetch(otpVerification, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        var responseJson = await response.json()
        return responseJson
    } catch (err) {
        console.log(err, "<====== OTP VERIFICATION")
    }
}