import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const courtsApi = createApi({
    reducerPath: 'courts',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://katserver.ddns.net/basketnow/api',
    }),
    endpoints(builder) {
        return {
            fetchCourt: builder.query({
                providesTags: (results, error, id) => {
                    return [{ type: 'Court', id }]
                },
                query: (id) => {
                    return {
                        url: '/courts',
                        params: {
                            id: id,
                        },
                        method: 'GET',
                    };
                },
            }),
            addCourt: builder.mutation({
                invalidatesTags: (results, error, court) => {
                    return [{ type: 'Court', id: court.id }]
                },
                query: (court) => {
                    return {
                        url: '/courts',
                        method: 'POST',
                        body: {
                            id: court.id,
                            markedFull: court.markedFull
                        },
                    };
                },
            }),
            markCourt: builder.mutation({
                invalidatesTags: (results, error, court) => {
                    return [{ type: 'Court', id: court.id }]
                },
                query: (court) => {
                    return {
                        url: `/courts/${court.id}`,
                        method: 'PUT',
                        body: {
                            markedFull: court.markedFull
                        },
                    };
                },
            })
        }
    }

})

export const { usefetchAreaCourtsQuery, useFetchCourtQuery, useAddCourtMutation, useMarkCourtMutation } = courtsApi;

export { courtsApi }