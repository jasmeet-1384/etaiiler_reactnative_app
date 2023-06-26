import AsyncStorage from '@react-native-async-storage/async-storage'
import { createSlice } from '@reduxjs/toolkit'
import { otpVerificationFetch } from '../api/OtpVerificationApi'
import * as RootNavigation from '../navigation/RootNavigation'
import { updateTokenApiCall } from './updateToken-slice'

const otpVericationSlice = createSlice({
    name: 'otpVerificationDetails',
    initialState: { otpData: '' },
    reducers: {
        setOtpData(state, action) {
            state.otpData = action.payload
        }
    }
})

export const otpVerificationApiCall = (phoneNumber, otp) => {
    return async dispatch => {
        try {
            const data = await otpVerificationFetch(phoneNumber, otp)
            dispatch(otpVericationSlice.actions.setOtpData(data))
            if (data.code == 200) {
                if (data.data.userData === undefined) {
                    await AsyncStorage.setItem('_id', data.data.businessData._id)
                    await AsyncStorage.setItem('role', data.data.businessData.role)
                    await AsyncStorage.setItem('state', data.data.businessData.state)
                    await AsyncStorage.setItem('phoneNumber', JSON.stringify(data.data.businessData.phoneNumber))
                    await AsyncStorage.setItem('profileImage', data.data.businessData.image)
                    await AsyncStorage.setItem('latitude', data?.data?.businessData?.gpsAddress?.latitude ? data?.data?.businessData?.gpsAddress?.latitude: '')
                    await AsyncStorage.setItem('longitude', data?.data?.businessData?.gpsAddress?.longitude ? data?.data?.businessData?.gpsAddress?.longitude : '')
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
                    await AsyncStorage.setItem('latitude', data?.data?.businessData?.gpsAddress?.latitude ? data?.data?.businessData?.gpsAddress?.latitude: '')
                    await AsyncStorage.setItem('longitude', data?.data?.businessData?.gpsAddress?.longitude ? data?.data?.businessData?.gpsAddress?.longitude : '')
                    let token = await AsyncStorage.getItem("@fcmToken")
                    let os = await AsyncStorage.getItem("@os")
                    dispatch(updateTokenApiCall(data.data.userData._id, token, os, data.data.userData.role))
                }
                // RootNavigation.navigate('TabNavigation')
                RootNavigation.navigationRef.reset({
                    index: 0,
                    routes: [{ name: 'TabNavigation' }]
                })
                console.log(data, "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")
            } else if (data.code == 403) {
                alert(data.message)
            }
            console.log("mobile otp verification api response === >", data)
        } catch (err) {
            console.log(err, "<=== mobile otp verification slice error")
        }
    }
}

export const otpVerificationAction = otpVericationSlice.actions
export default otpVericationSlice