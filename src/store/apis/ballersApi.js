import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const ballersApi = createApi({
    reducerPath: 'ballers',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://katserver.ddns.net/basketnow/api',
    }),
    endpoints(builder) {
        return {
            fetchActiveCourtsID: builder.query({
                providesTags: (results, error) => {
                    return ["ActiveCourts"]
                },
                query: () => {
                    var tdate = new Date(Date.now())
                    var today = `${tdate.getUTCDate()}${tdate.getUTCMonth()}`
                    return {
                        url: '/ballers',
                        params: {
                            date: today,
                        },
                        method: 'GET',
                    };
                },
            }),
            fetchCourtBallers: builder.query({
                providesTags: (results, error, courtId) => {
                    return [{ type: 'Ballers', id: courtId }]
                },
                query: (courtId) => {
                    var tdate = new Date(Date.now())
                    var today = `${tdate.getUTCDate()}${tdate.getUTCMonth()}`
                    return {
                        url: '/ballers',
                        params: {
                            courtId: courtId,
                            date:today
                        },
                        method: 'GET',
                    };
                },
                transformResponse: (response, meta, arg) => {
                    var tdate = new Date(Date.now())
                    var today = `${tdate.getUTCDate()}${tdate.getUTCMonth()}`
                    var data =[]
                    response.map((group) => {
                        if (group.date === today)
                            data.push(group)
                    })
                    return data;
                },
            }),
            addBallers: builder.mutation({
                invalidatesTags: (results, error, ballers) => {
                    return [{ type: 'Ballers', id: ballers.courtId },"ActiveCourts"]
                },
                query: (ballers) => {
                    return {
                        url: '/ballers',
                        method: 'POST',
                        body: {
                            name:ballers.name,
                            players: ballers.players.toString(),
                            playersNeeded: ballers.playersNeeded.toString(),
                            timeFrom: ballers.timeFrom,
                            timeTo: ballers.timeTo,
                            date: ballers.date,
                            courtId: ballers.courtId.toString()
                        },
                    };
                },
            }),
            joinBallers: builder.mutation({
                invalidatesTags: (results, error, ballers) => {
                    return [{ type: 'Ballers', id: ballers.courtId },"ActiveCourts"]
                },
                query: (ballers) => {
                    return {
                        url: `/ballers/${ballers.id}`,
                        method: 'PUT',
                        body: {
                            name:ballers.name,
                            players: ballers.players,
                            playersNeeded: ballers.playersNeeded,
                            timeFrom: ballers.timeFrom,
                            timeTo: ballers.timeTo,
                            date: ballers.date,
                            courtId: ballers.courtId
                        },
                    };
                },
            }),
        }
    }

})

export const { useFetchActiveCourtsIDQuery, useFetchCourtBallersQuery, useAddBallersMutation,useJoinBallersMutation } = ballersApi;

export { ballersApi }