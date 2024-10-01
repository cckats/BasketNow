import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { usersApi } from "./apis/usersApi";
import { courtsApi } from "./apis/courtsApi";
import { ballersApi } from "./apis/ballersApi";

const store = configureStore({
    reducer: {
        [usersApi.reducerPath]: usersApi.reducer,
        [courtsApi.reducerPath]: courtsApi.reducer,
        [ballersApi.reducerPath]: ballersApi.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .concat(usersApi.middleware, courtsApi.middleware, ballersApi.middleware)
    }
});

setupListeners(store.dispatch);

export { useAddUserMutation } from './apis/usersApi';
export { usefetchAreaCourtsQuery, useFetchCourtQuery, useAddCourtMutation, useMarkCourtMutation } from './apis/courtsApi';
export { useFetchActiveCourtsIDQuery,useFetchCourtBallersQuery, useAddBallersMutation,useJoinBallersMutation } from './apis/ballersApi'

export { store };
