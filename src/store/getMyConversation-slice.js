import AsyncStorage from '@react-native-async-storage/async-storage'
import { createSlice } from '@reduxjs/toolkit'
import { getMyConversationFetch } from '../api/GetMyConversationApi'
import * as RootNavigation from '../navigation/RootNavigation'

const getMyConversationSlice = createSlice({
    name: 'getMyConversation',
    initialState: { getMyConversationDetails: '' },
    reducers: {
        setgetMyConversationData(state, action) {
            state.getMyConversationDetails = action.payload
        }
    }
})

export const getMyConversationApiCall = (from) => {
    return async dispatch => {
        try {
            const data = await getMyConversationFetch(from)
            dispatch(getMyConversationSlice.actions.setgetMyConversationData(data))
            console.log("getMyConversation api response === >", data)
        } catch (err) {
            console.log(err, "<=== getMyConversation slice error")
        }
    }
}

export const getMyConversationAction = getMyConversationSlice.actions
export default getMyConversationSlice