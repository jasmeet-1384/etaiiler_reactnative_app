import { createSlice } from '@reduxjs/toolkit'
import { uploadImageToDBFetch } from '../api/UploadImageToDBApi'
import * as RootNavigation from '../navigation/RootNavigation'

const uploadImagetoDBSlice = createSlice({
    name: 'uploadImageToDBDetails',
    initialState: { imageData: '' },
    reducers: {
        setImageData(state, action) {
            state.imageData = action.payload
        }
    }
})

export const uploadImageToDBApiCall = (user_id, image, description,role,tagged_id,postType, hash) => {
    return async dispatch => {
        try {
            const data = await uploadImageToDBFetch(user_id, image, description,role,tagged_id,postType, hash)
            dispatch(uploadImagetoDBSlice.actions.setImageData(data))
            if (data.code == 201) {
                RootNavigation.navigate('TabNavigation')
            }else if(data.code == 403){
                alert(data.message)
            }
            console.log("upload image to db api response === >", data)
        } catch (err) {
            console.log(err, "<=== upload image to db slice error")
        }
    }
}

export const uploadImageToDBAction = uploadImagetoDBSlice.actions
export default uploadImagetoDBSlice