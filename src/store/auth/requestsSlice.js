import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  requested: [],
  requests: [],
  donateUsers: [],
};

// const ree = (rem, state) => {
//   state.requested = rem;

// };

const requestsSlice = createSlice({
  name: 'requests',
  initialState,
  reducers: {
    setRequested: (state, action) => {
      state.requests = action.payload;
    },
    setRequestedImage: (state, action) => {
      state.requested = action.payload;
    },
    getDonateUsers: (state, action) => {
      state.donateUsers = action.payload;
    },
  },
  extraReducers: builder => {
    // builder.addCase(getImageRequested.fulfilled, (state, action) => {
    //   state.requested = action;
    //   // action is inferred correctly here if using TS
    // });
  },
});

export const {setRequested, setRequestedImage, getDonateUsers} =
  requestsSlice.actions;
export default requestsSlice.reducer;
