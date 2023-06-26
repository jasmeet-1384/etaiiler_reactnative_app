import { createSlice } from '@reduxjs/toolkit'
import { getAllPostsFetch } from '../api/GetAllPostsApi'
import * as RootNavigation from '../navigation/RootNavigation'

const getAllPostsSlice = createSlice({
    name: 'getAllPostsDetails',
    initialState: { getAllPostsData: '' },
    reducers: {
        setGetAllPostsData(state, action) {
            state.getAllPostsData = action.payload
        }
    }
})

export const getAllPostsApiCall = () => {
    return async dispatch => {
        try {
            const data = await getAllPostsFetch()
            dispatch(getAllPostsSlice.actions.setGetAllPostsData(data))
            // console.log("get all posts api response === >", data)
        } catch (err) {
            console.log(err, "<=== upload image to db slice error")
        }
    }
}

export const getAllPostsAction = getAllPostsSlice.actions
export default getAllPostsSlice