import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const usersApi = createApi({
    reducerPath: 'users',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3005',
    }),
    endpoints(builder) {
        return {
            fecthUser: builder.mutation({
                invalidatesTags:(result,error,user)=>{
                    return [{type:'UserUsers', id: user.id}]
                },
                query: (user) => {
                    return {
                        url: '/users',
                        method: 'POST',
                        body: {
                            title: user.id,
                            userId: user.id,
                        },
                    };
                },
            }),
            addUser: builder.mutation({
                invalidatesTags:(result,error,user)=>{
                    return [{type:'UserUsers', id: user.id}]
                },
                query: (user) => {
                    return {
                        url: '/users',
                        method: 'POST',
                        body: {
                            title: user.id,
                            userId: user.id,
                        },
                    };
                },
            })
        }
    }

})

export const {  useAddUserMutation} = usersApi;

export { usersApi }