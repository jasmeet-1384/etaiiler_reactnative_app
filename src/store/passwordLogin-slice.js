import AsyncStorage from '@react-native-async-storage/async-storage'
import { createSlice } from '@reduxjs/toolkit'
import { passwordLoginFetch } from '../api/PasswordLoginApi'
import { updateTokenApiCall } from '../store/updateToken-slice'
import * as RootNavigation from '../navigation/RootNavigation'

const passwordLoginSlice = createSlice({
    name: 'passwordLogin',
    initialState: { loginDetails: '' },
    reducers: {
        setLoginData(state, action) {
            state.loginDetails = action.payload
        }
    }
})

export const passwordLoginApiCall = (phoneNumber, password) => {
    return async dispatch => {
        try {
            const data = await passwordLoginFetch(phoneNumber, password)
            dispatch(passwordLoginSlice.actions.setLoginData(data))
            if (data.code == 200) {
                if (data.data.userData === undefined) {
                    await AsyncStorage.setItem('_id', data.data.businessData._id)
                    await AsyncStorage.setItem('role', data.data.businessData.role)
                    await AsyncStorage.setItem('state', data.data.businessData.state)
                    await AsyncStorage.setItem('phoneNumber', JSON.stringify(data.data.businessData.phoneNumber))
                    await AsyncStorage.setItem('profileImage', data.data.businessData.image)
                    await AsyncStorage.setItem('latitude', data.data.businessData.gpsAddress.latitude)
                    await AsyncStorage.setItem('longitude', data.data.businessData.gpsAddress.longitude)
                    let token = await AsyncStorage.getItem("@fcmToken")
                    let os = await AsyncStorage.getItem("@os")
                    dispatch(updateTokenApiCall(data.data.businessData._id, token, os, data.data.businessData.role))
                } else if (data.data.businessData === undefined) {
                    console.log(data.data)

                    await AsyncStorage.setItem('_id', data.data.userData._id)
                    await AsyncStorage.setItem('role', data.data.userData.role)
                    await AsyncStorage.setItem('state', data.data.userData.state)
                    await AsyncStorage.setItem('phoneNumber', JSON.stringify(data.data.userData.phoneNumber))
                    await AsyncStorage.setItem('profileImage', data.data.userData.image)
                    await AsyncStorage.setItem('latitude', data.data.userData.gpsAddress.latitude)
                    await AsyncStorage.setItem('longitude', data.data.userData.gpsAddress.longitude)
                    let token = await AsyncStorage.getItem("@fcmToken")
                    let os = await AsyncStorage.getItem("@os")
                    dispatch(updateTokenApiCall(data.data.userData._id, token, os, data.data.userData.role))
                }
                RootNavigation.navigationRef.reset({
                    index: 0,
                    routes: [{ name: 'TabNavigation' }]
                })
                console.log(data.data.userData._id)
            } else if (data.code == 403) {
                alert(data.message)
            }
            console.log("password login api response === >", data)
        } catch (err) {
            console.log(err, "<=== password login slice error")
        }
    }
}

export const passwordLoginAction = passwordLoginSlice.actions
export default passwordLoginSlice