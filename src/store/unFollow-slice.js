import AsyncStorage from '@react-native-async-storage/async-storage'
import { createSlice } from '@reduxjs/toolkit'
import { unfollowFetch } from '../api/FollowUnfollowApi'
import * as RootNavigation from '../navigation/RootNavigation'

const unfollowSlice = createSlice({
    name: 'unfollow',
    initialState: { unfollowDetails: '' },
    reducers: {
        setunfollowData(state, action) {
            state.unfollowDetails = action.payload
        }
    }
})

export const unfollowApiCall = (followId,user_id) => {
    return async dispatch => {
        try {
            const data = await unfollowFetch(followId,user_id)
            dispatch(unfollowSlice.actions.setunfollowData(data))
            console.log("unfollow api response === >", data)
        } catch (err) {
            console.log(err, "<=== unfollow slice error")
        }
    }
}

export const unfollowAction = unfollowSlice.actions
export default unfollowSlice