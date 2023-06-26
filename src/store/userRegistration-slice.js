import { createSlice } from '@reduxjs/toolkit'
import { userRegistration } from '../api/UserRegistrationApi'
import {ToastAndroid} from 'react-native'
import * as RootNavigation from '../navigation/RootNavigation'

const userRegistrationSlice = createSlice({
    name: 'userRegistration',
    initialState: { isRegistered: '' },
    reducers: {
        setIsRegistered(state, action) {
            state.isRegistered = action.payload
        }
    }
})

export const userRegistrationApiCall = (fullname, password, dob, bio, state, city, pincode, gender, phoneNumber, role,latitude,longitude, image) => {
    return async dispatch => {
        try {
            const data = await userRegistration(fullname, password, dob, bio, state, city, pincode, gender, phoneNumber, role,latitude,longitude, image)
            console.log("Data => ", data)
            dispatch(userRegistrationSlice.actions.setIsRegistered(data))
            if (data.code == 201) {
                ToastAndroid.show('Registration Successful',ToastAndroid.LONG)
                RootNavigation.navigate('SignUpScreen')
            }else if(data.code == 400){
                alert(data.message)
            }
            console.log("user registration api response === >", data)
        } catch (err) {
            console.log(err, "<=== user registration slice error")
        }
    }
}

export const userRegistrationAction = userRegistrationSlice.actions
export default userRegistrationSlice