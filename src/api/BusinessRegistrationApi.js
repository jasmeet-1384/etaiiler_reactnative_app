import { postRegisterBusinessUrl } from './apiConstant'

export const businessRegistration = async (fullname, password, state, city, addressLine1, addressLine2, pincode, productCategory, phoneNumber, natureOfBusiness, website, role,latitude,longitude, profilePic) => {
    try {
        var data = {
            name: fullname,
            password: password,
            state: state,
            city: city,
            addressLine1: addressLine1,
            addressLine2: addressLine2,
            pincode: pincode,
            productCategory: productCategory,
            phoneNumber: phoneNumber,
            natureOfBusiness: natureOfBusiness,
            website: website,
            role: role,
            latitude: latitude,
            longitude : longitude,
            image: profilePic
        }

        var response = await fetch(postRegisterBusinessUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        var responseJson = await response.json()
        return responseJson
    } catch (err) {
        console.log(err, "<====== REGISTRATION BUSINESS")
    }
}