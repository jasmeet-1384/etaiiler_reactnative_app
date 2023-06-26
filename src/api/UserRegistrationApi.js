import { postRegisterUserUrl } from './apiConstant'

export const userRegistration = async (fullname, password, dob, bio, state, city, pincode, gender, phoneNumber, role,latitude,longitude, image) => {
    try {
        var data = {
            name: fullname,
            password: password,
            dob: dob,
            bio: bio,
            state: state,
            city: city,
            pincode: pincode,
            gender: gender,
            phoneNumber: phoneNumber,
            role: role,
            latitude: latitude,
            longitude : longitude,
            image: image
        }

        var response = await fetch(postRegisterUserUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        var responseJson = await response.json()
        return responseJson
    } catch (err) {
        console.log(err, "<====== REGISTRATION USER")
    }
}