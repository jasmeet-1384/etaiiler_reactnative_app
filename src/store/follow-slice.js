import AsyncStorage from '@react-native-async-storage/async-storage'
import { createSlice } from '@reduxjs/toolkit'
import { followFetch } from '../api/FollowUnfollowApi'
import * as RootNavigation from '../navigation/RootNavigation'

const followSlice = createSlice({
    name: 'follow',
    initialState: { followDetails: '' },
    reducers: {
        setfollowData(state, action) {
            state.followDetails = action.payload
        }
    }
})

export const followApiCall = (followId, user_id , role) => {
    return async dispatch => {
        try {
            const data = await followFetch(followId, user_id , role)
            dispatch(followSlice.actions.setfollowData(data))
            console.log("follow api response === >", data)
        } catch (err) {
            console.log(err, "<=== follow slice error")
        }
    }
}

export const followAction = followSlice.actions
export default followSlice