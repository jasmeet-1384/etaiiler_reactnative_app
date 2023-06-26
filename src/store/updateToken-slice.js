import AsyncStorage from '@react-native-async-storage/async-storage'
import { createSlice } from '@reduxjs/toolkit'
import { updateTokenFetch } from '../api/UpdateTokenApi'
import * as RootNavigation from '../navigation/RootNavigation'

const updateTokenSlice = createSlice({
    name: 'updateToken',
    initialState: { updateTokenDetails: '' },
    reducers: {
        setupdateTokenData(state, action) {
            state.updateTokenDetails = action.payload
        }
    }
})

export const updateTokenApiCall = (id, token, os,role) => {
    return async dispatch => {
        try {
            const data = await updateTokenFetch(id, token, os,role)
            dispatch(updateTokenSlice.actions.setupdateTokenData(data))
            console.log("updateToken response === >", data)
        } catch (err) {
            console.log(err, "<=== updateToken error")
        }
    }
}

export const updateTokenAction = updateTokenSlice.actions
export default updateTokenSlice