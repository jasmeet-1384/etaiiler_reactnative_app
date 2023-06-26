import AsyncStorage from '@react-native-async-storage/async-storage'
import { createSlice } from '@reduxjs/toolkit'
import { addCommentFetch } from '../api/AddCommentApi'
import * as RootNavigation from '../navigation/RootNavigation'

const addCommentSlice = createSlice({
    name: 'addComment',
    initialState: { addCommentDetails: '' },
    reducers: {
        setAddCommentData(state, action) {
            state.addCommentDetails = action.payload
        }
    }
})

export const addCommentApiCall = (user_id, postId, text, role) => {
    return async dispatch => {
        try {
            const data = await addCommentFetch(user_id, postId, text, role)
            dispatch(addCommentSlice.actions.setAddCommentData(data))
            console.log("comment post api response === >", data)
        } catch (err) {
            console.log(err, "<=== comment post slice error")
        }
    }
}

export const addCommentAction = addCommentSlice.actions
export default addCommentSlice