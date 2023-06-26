import AsyncStorage from '@react-native-async-storage/async-storage'
import { createSlice } from '@reduxjs/toolkit'
import { removePostLikeFetch } from '../api/RemovePostLikeApi'
import * as RootNavigation from '../navigation/RootNavigation'

const removePostLikeSlice = createSlice({
    name: 'removePostLike',
    initialState: { removePostLikeDetails: '' },
    reducers: {
        setRemovePostLikeData(state, action) {
            state.removePostLikeDetails = action.payload
        }
    }
})

export const removePostLikeApiCall = (postId,user_id) => {
    return async dispatch => {
        try {
            const data = await removePostLikeFetch(postId,user_id)
            dispatch(removePostLikeSlice.actions.setRemovePostLikeData(data))
            console.log("unlike post api response === >", data)
        } catch (err) {
            console.log(err, "<=== unlike post slice error")
        }
    }
}

export const removePostLikeAction = removePostLikeSlice.actions
export default removePostLikeSlice