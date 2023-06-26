import AsyncStorage from '@react-native-async-storage/async-storage'
import { createSlice } from '@reduxjs/toolkit'
import { getAllBusinessFetch } from '../api/GetAllBusinessApi'
import * as RootNavigation from '../navigation/RootNavigation'

const getAllBusinessSlice = createSlice({
    name: 'getAllBusiness',
    initialState: { getAllBusinessDetails: '' },
    reducers: {
        setgetAllBusinessData(state, action) {
            state.getAllBusinessDetails = action.payload
        }
    }
})

export const getAllBusinessApiCall = () => {
    return async dispatch => {
        try {
            const data = await getAllBusinessFetch()
            dispatch(getAllBusinessSlice.actions.setgetAllBusinessData(data))
            console.log("get all business api response === >", data)
        } catch (err) {
            console.log(err, "<=== get all business slice error")
        }
    }
}

export const getAllBusinessAction = getAllBusinessSlice.actions
export default getAllBusinessSlice