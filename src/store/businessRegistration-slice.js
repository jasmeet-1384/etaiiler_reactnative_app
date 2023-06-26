import { createSlice } from '@reduxjs/toolkit'
import { businessRegistration } from '../api/BusinessRegistrationApi'
import * as RootNavigation from '../navigation/RootNavigation'
import {ToastAndroid} from 'react-native'

const businessRegistrationSlice = createSlice({
    name: 'businessRegistration',
    initialState: { isRegistered: '' },
    reducers: {
        setIsRegistered(state, action) {
            state.isRegistered = action.payload
        }
    }
})

export const businessRegistrationApiCall = (fullname, password, state, city, addressLine1, addressLine2, pincode, productCategory, phoneNumber, natureOfBusiness, website, role,latitude,longitude, profilePic) => {
    return async dispatch => {
        try {
            const data = await businessRegistration(fullname, password, state, city, addressLine1, addressLine2, pincode, productCategory, phoneNumber, natureOfBusiness, website, role,latitude,longitude, profilePic)
            dispatch(businessRegistrationSlice.actions.setIsRegistered(data))
            if (data.code == 201) {
                ToastAndroid.show('Registration Successful',ToastAndroid.LONG)
                RootNavigation.navigate('SignUpScreen')
            }else if(data.code == 400){
                alert(data.message)
            }
            console.log("business registration api response === >", data)
        } catch (err) {
            console.log(err, "<=== business registration slice error")
        }
    }
}

export const businessRegistrationAction = businessRegistrationSlice.actions
export default businessRegistrationSlice