import { configureStore } from "@reduxjs/toolkit";
import userAccountDataSlice from "./redux/user-account-data.redux";
import registerFieldSlice from "./redux/register-field-redux";

const store = configureStore({
    reducer: { 
      userAccountData:userAccountDataSlice.reducer,
      registerProviderField:registerFieldSlice.reducer,
    },
  });
  
export default store;

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
  