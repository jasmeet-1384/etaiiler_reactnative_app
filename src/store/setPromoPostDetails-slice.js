import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    postDetails: {},
}

export const setPromoPostDetailsSlice = createSlice({
    name: 'promoPostDetails',
    initialState,
    reducers: {
      setPromoPostDetails: (state, action) => {
        state.postDetails = action.payload
      },
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { setPromoPostDetails } = setPromoPostDetailsSlice.actions
  
  export default setPromoPostDetailsSlice.reducer