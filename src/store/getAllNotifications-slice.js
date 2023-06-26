import AsyncStorage from '@react-native-async-storage/async-storage'
import { createSlice } from '@reduxjs/toolkit'
import { getNotificationsFetch } from '../api/GetAllNotifications'
import * as RootNavigation from '../navigation/RootNavigation'

const getNotificationsSlice = createSlice({
    name: 'getNotifications',
    initialState: { getNotificationsDetails: '' },
    reducers: {
        setgetNotificationsData(state, action) {
            state.getNotificationsDetails = action.payload
        }
    }
})

export const getNotificationsApiCall = (user_id,role) => {
    return async dispatch => {
        try {
            const data = await getNotificationsFetch(user_id,role)
            dispatch(getNotificationsSlice.actions.setgetNotificationsData(data))
            console.log("getNotifications api response === >", data)
        } catch (err) {
            console.log(err, "<=== getNotifications slice error")
        }
    }
}

export const getNotificationsAction = getNotificationsSlice.actions
export default getNotificationsSlice