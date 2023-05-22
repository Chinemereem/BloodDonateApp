import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {auth} from '../../../firebase';
import {getAuth} from 'firebase/auth';
import {sendEmailVerification} from 'firebase/auth';

const initialState = {
  user: {},
  error: '',
  authenticated: false,
  useData: [],
  data: [],
};
const isRejectedAction = action => {
  return action.type.endsWith('rejected');
};

// export const createUser = createAsyncThunk(
//   'auth/createUser',
//   async ({email, password}) => {
//     const response = await auth.createUserWithEmailAndPassword(email, password);
//     return response.data;
//   },
// );
export const onLogin = createAsyncThunk(
  'auth/loginUser',
  async ({email, password}) => {
    const response = await auth.signInWithEmailAndPassword(email, password);
    return response.user;
  },
);

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword ',
  async email => {
    const response = await auth.sendPasswordResetEmail(email);
    // auth.currentUser.email
    return response;
  },
);

export const getUser = createAsyncThunk('auth/getUser', async () => {
  const response = getAuth();
  return response;
});

export const VerifyEmail = createAsyncThunk(
  'auth/sendEmailVerification ',
  async () => {
    const response = await sendEmailVerification();
    return response;
  },
);
const authSlice = createSlice({
  name: 'authen',
  initialState,
  reducers: {
    logOut: state => {
      state.user = initialState;
    },
    setBloodGroup: (state, action) => {
      state.bloodGroup = action.payload;
    },
    setUserDetail: (state, action) => {
      state.useDetail = action.payload;
    },
    createUser: (state, action) => {
      state.user = action.payload;
    },
    retrieveUserData: (state, action) => {
      state.data = action.payload;
    },
  },
  // extraReducers: {
  //   [createUser.fulfilled]: (state, action) => {
  //     state.user = action.meta;
  //   },
  //   [onLogin.fulfilled]: (state, action) => {
  //     state.user = action.meta;

  //   },
  //   [getUser.fulfilled]: (state, action) => {
  //     state.user = action.payload.currentUser;
  //   },
  // },
  extraReducers: builder => {
    builder
      // .addCase(createUser.fulfilled, (state, action) => {
      //   state.user = action.meta;
      //   // action is inferred correctly here if using TS
      // })
      // You can chain calls, or have separate `builder.addCase()` lines each time
      .addCase(onLogin.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload.currentUser;
      })

      // You can match a range of action types
      .addMatcher(
        isRejectedAction,
        // `action` will be inferred as a RejectedAction due to isRejectedAction being defined as a type guard
        (state, action) => {},
      )
      // and provide a default case if no other handlers matched
      .addDefaultCase((state, action) => {});
  },
});

export const {
  logOut,
  login,
  createAccount,
  createUser,
  setUserDetail,
  retrieveUserData,
} = authSlice.actions;
export default authSlice.reducer;
