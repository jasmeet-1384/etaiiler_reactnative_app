import { createSlice } from '@reduxjs/toolkit'
import { getAllPostLikesFetch } from '../api/GetPostLikesApi'
import * as RootNavigation from '../navigation/RootNavigation'

const getAllPostLikesSlice = createSlice({
    name: 'getAllPostLikes',
    initialState: { getAllPostLikesData: '' },
    reducers: {
        setgetAllPostLikesData(state, action) {
            state.getAllPostLikesData = action.payload
        }
    }
})

export const getAllPostLikesApiCall = () => {
    return async dispatch => {
        try {
            const data = await getAllPostLikesFetch()
            dispatch(getAllPostLikesSlice.actions.setgetAllPostLikesData(data))
            console.log("get all posts likes api response === >", data)
        } catch (err) {
            console.log(err, "<=== get all posts likes api slice error")
        }
    }
}

export const getAllPostLikesAction = getAllPostLikesSlice.actions
export default getAllPostLikesSlice