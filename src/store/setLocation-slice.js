import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    location: {},
}

export const setLocationSlice = createSlice({
    name: 'setLocation',
    initialState,
    reducers: {
      setLocationFromMap: (state, action) => {
        state.location = action.payload
      },
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { setLocationFromMap } = setLocationSlice.actions
  
  export default setLocationSlice.reducer