import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    address: [],
}

export const setAddressSlice = createSlice({
    name: 'setAddress',
    initialState,
    reducers: {
      setAddressFromMap: (state, action) => {
        state.address = action.payload
      },
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { setAddressFromMap } = setAddressSlice.actions
  
  export default setAddressSlice.reducer