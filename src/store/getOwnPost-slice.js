import AsyncStorage from '@react-native-async-storage/async-storage'
import { createSlice } from '@reduxjs/toolkit'
import { getOwnPostsFetch } from '../api/GetAllPostsApi'
import * as RootNavigation from '../navigation/RootNavigation'

const getOwnPostsSlice = createSlice({
    name: 'getOwnPosts',
    initialState: { getOwnPostsDetails: '' },
    reducers: {
        setgetOwnPostsData(state, action) {
            state.getOwnPostsDetails = action.payload
        }
    }
})

export const getOwnPostsApiCall = (postId) => {
    return async dispatch => {
        try {
            const data = await getOwnPostsFetch(postId)
            dispatch(getOwnPostsSlice.actions.setgetOwnPostsData(data))
            console.log("getOwnPosts response === >", data)
        } catch (err) {
            console.log(err, "<=== getOwnPosts slice error")
        }
    }
}

export const getOwnPostsAction = getOwnPostsSlice.actions
export default getOwnPostsSlice