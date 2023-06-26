import AsyncStorage from '@react-native-async-storage/async-storage'
import { createSlice } from '@reduxjs/toolkit'
import { getAllUsersFetch } from '../api/GetAllUsersApi'
import * as RootNavigation from '../navigation/RootNavigation'

const getAllUsersSlice = createSlice({
    name: 'getAllUsers',
    initialState: { getAllUsersDetails: '' },
    reducers: {
        setgetAllUsersData(state, action) {
            state.getAllUsersDetails = action.payload
        }
    }
})

export const getAllUsersApiCall = () => {
    return async dispatch => {
        try {
            const data = await getAllUsersFetch()
            dispatch(getAllUsersSlice.actions.setgetAllUsersData(data))
            // console.log("get all useres api response === >", data)
        } catch (err) {
            console.log(err, "<=== get all users slice error")
        }
    }
}

export const getAllUsersAction = getAllUsersSlice.actions
export default getAllUsersSlice