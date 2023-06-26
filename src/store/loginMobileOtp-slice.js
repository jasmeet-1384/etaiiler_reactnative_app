import { createSlice } from '@reduxjs/toolkit'
import { loginFetch } from '../api/LoginApi'
import * as RootNavigation from '../navigation/RootNavigation'

const loginMobileOtpSlice = createSlice({
    name: 'loginMobileNumberOtp',
    initialState: { otpData: '' },
    reducers: {
        setOtpData(state, action) {
            state.otpData = action.payload
        }
    }
})

export const loginMobileNumberOtpApiCall = (phoneNumber) => {
    return async dispatch => {
        try {
            const data = await loginFetch(phoneNumber)
            dispatch(loginMobileOtpSlice.actions.setOtpData(data))
            if (data.code == 201) {
                RootNavigation.navigate('OtpScreen',{from : "Login"})
            }else if(data.code == 403){
                alert(data.message)
            }
            console.log("mobile otp generation api response === >", data)
        } catch (err) {
            console.log(err, "<=== mobile otp slice error")
        }
    }
}

export const loginMobileOtpSliceAction = loginMobileOtpSlice.actions
export default loginMobileOtpSlice