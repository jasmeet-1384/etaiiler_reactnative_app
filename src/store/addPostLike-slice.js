import AsyncStorage from '@react-native-async-storage/async-storage'
import { createSlice } from '@reduxjs/toolkit'
import { addPostLikeFetch } from '../api/AddPostLikeApi'
import * as RootNavigation from '../navigation/RootNavigation'

const addPostLikeSlice = createSlice({
    name: 'addPostLike',
    initialState: { addPostLikeDetails: '' },
    reducers: {
        setAddPostLikeData(state, action) {
            state.addPostLikeDetails = action.payload
        }
    }
})

export const addPostLikeApiCall = (postId,user_id,role) => {
    return async dispatch => {
        try {
            const data = await addPostLikeFetch(postId,user_id,role)
            dispatch(addPostLikeSlice.actions.setAddPostLikeData(data))
            console.log("like post api response === >", data)
        } catch (err) {
            console.log(err, "<=== like post slice error")
        }
    }
}

export const addPostLikeAction = addPostLikeSlice.actions
export default addPostLikeSlice