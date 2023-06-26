import AsyncStorage from '@react-native-async-storage/async-storage'
import { createSlice } from '@reduxjs/toolkit'
import { getCommentFetch } from '../api/GetCommentApi'
import * as RootNavigation from '../navigation/RootNavigation'

const getCommentSlice = createSlice({
    name: 'getComment',
    initialState: { getCommentDetails: '' },
    reducers: {
        setGetCommentData(state, action) {
            state.getCommentDetails = action.payload
        }
    }
})

export const getCommentApiCall = (postId) => {
    return async dispatch => {
        try {
            const data = await getCommentFetch(postId)
            dispatch(getCommentSlice.actions.setGetCommentData(data))
            console.log("get all comment api response === >", data)
        } catch (err) {
            console.log(err, "<=== get comment slice error")
        }
    }
}

export const getCommentAction = getCommentSlice.actions
export default getCommentSlice