import AsyncStorage from '@react-native-async-storage/async-storage'
import { createSlice } from '@reduxjs/toolkit'
import { getfollowFetch } from '../api/FollowUnfollowApi'
import * as RootNavigation from '../navigation/RootNavigation'

const getfollowSlice = createSlice({
    name: 'getfollow',
    initialState: { getfollowDetails: '' },
    reducers: {
        setgetfollowData(state, action) {
            state.getfollowDetails = action.payload
        }
    }
})

export const getfollowApiCall = (followingWhom) => {
    return async dispatch => {
        try {
            const data = await getfollowFetch(followingWhom)
            dispatch(getfollowSlice.actions.setgetfollowData(data))
            console.log("get follow api response === >", data)
        } catch (err) {
            console.log(err, "<=== get follow slice error")
        }
    }
}

export const getfollowAction = getfollowSlice.actions
export default getfollowSlice