import AsyncStorage from '@react-native-async-storage/async-storage'
import { createSlice } from '@reduxjs/toolkit'
import { getMyMessagesFetch } from '../api/GetMyMessagesApi'
import * as RootNavigation from '../navigation/RootNavigation'

const getMyMessagesSlice = createSlice({
    name: 'getMyMessages',
    initialState: { getMyMessagesDetails: '' },
    reducers: {
        setgetMyMessagesData(state, action) {
            state.getMyMessagesDetails = action.payload
        }
    }
})

export const getMyMessagesApiCall = (conversation_id) => {
    return async dispatch => {
        try {
            const data = await getMyMessagesFetch(conversation_id)
            dispatch(getMyMessagesSlice.actions.setgetMyMessagesData(data))
            console.log("getMyMessages api response === >", data)
        } catch (err) {
            console.log(err, "<=== getMyMessages slice error")
        }
    }
}

export const getMyMessagesAction = getMyMessagesSlice.actions
export default getMyMessagesSlice