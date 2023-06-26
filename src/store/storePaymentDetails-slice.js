import AsyncStorage from '@react-native-async-storage/async-storage'
import { createSlice } from '@reduxjs/toolkit'
import { updateTokenFetch } from '../api/UpdateTokenApi'
import * as RootNavigation from '../navigation/RootNavigation'

const initialState = {
    grandTotal: '',
    time : '',
    amount : '',
    gst : '',
    disAmt : ''
}

export const storePaymentDetailsSlice = createSlice({
    name : 'payment',
    initialState,
    reducers : {
        addGrandTotal : (state,action) => {
            state.grandTotal = action.payload
        },
        addTime : (state,action) => {
            state.time = action.payload
        },
        addAmount : (state,action) => {
            state.amount = action.payload
        },
        addGst : (state,action) => {
            state.gst = action.payload
        },
        addDisAmt : (state,action) => {
            state.disAmt = action.payload
        }
    }
})

export const {addAmount,addGrandTotal,addGst,addTime,addDisAmt} = storePaymentDetailsSlice.actions
export default storePaymentDetailsSlice.reducer