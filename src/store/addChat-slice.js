import AsyncStorage from '@react-native-async-storage/async-storage'
import { createSlice } from '@reduxjs/toolkit'
import { addChatFetch } from '../api/AddChatApi'
import * as RootNavigation from '../navigation/RootNavigation'

const addChatSlice = createSlice({
    name: 'addChat',
    initialState: { addChatDetails: '' },
    reducers: {
        setaddChatData(state, action) {
            state.addChatDetails = action.payload
        }
    }
})

export const addChatApiCall = (from, to, message) => {
    return async dispatch => {
        try {
            const data = await addChatFetch(from, to, message)
            dispatch(addChatSlice.actions.setaddChatData(data))
            console.log("addChat api response === >", data)
        } catch (err) {
            console.log(err, "<=== addChat slice error")
        }
    }
}

export const addChatAction = addChatSlice.actions
export default addChatSlice