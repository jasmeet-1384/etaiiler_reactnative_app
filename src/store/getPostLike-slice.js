import AsyncStorage from '@react-native-async-storage/async-storage'
import { createSlice } from '@reduxjs/toolkit'
import { getPostLikeFetch } from '../api/GetPostLikesApi'
import * as RootNavigation from '../navigation/RootNavigation'

const getPostLikeSlice = createSlice({
    name: 'getPostLike',
    initialState: { getPostLikeDetails: '' },
    reducers: {
        setGetPostLikeData(state, action) {
            state.getPostLikeDetails = action.payload
        }
    }
})

export const getPostLikeApiCall = (postId) => {
    return async dispatch => {
        try {
            const data = await getPostLikeFetch(postId)
            dispatch(getPostLikeSlice.actions.setGetPostLikeData(data))
            console.log("get like api response === >", data)
        } catch (err) {
            console.log(err, "<=== get post slice error")
        }
    }
}

export const getPostLikeAction = getPostLikeSlice.actions
export default getPostLikeSlice