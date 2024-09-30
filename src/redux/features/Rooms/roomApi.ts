import { baseApi } from "../../api/baseApi";

const roomApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addRoom: builder.mutation({
            query: (roomInfo) => ({
                url: '/rooms',
                method: 'POST',
                body: roomInfo,
            }),
        })
        ,
        getRooms: builder.query({
            query: () => {
                return {
                    url: '/rooms',
                    method: "GET",
                };
            },
            providesTags: ['room'],
        }),

        getSingleRooms: builder.query({
            query: ({ roomId }) => {
                return {
                    url: `/rooms/${roomId}`,
                    method: "GET",
                };
            },
            providesTags: ['room'],
        }),

        updateRoom: builder.mutation({
            query: ({ roomId, roomInfo }) => ({
                url: `/rooms/${roomId}`,
                method: "PUT",
                body: roomInfo,
            }),
            invalidatesTags: ["room"],
        }),

        deleteRoom: builder.mutation({
            query: (roomId) => ({
                url: `/rooms/${roomId}`,
                method: "DELETE",
                body: { idDeleted: true },
            }),
            invalidatesTags: ["room"],
        }),
    }),
});

export const { useAddRoomMutation, useGetRoomsQuery, useDeleteRoomMutation, useUpdateRoomMutation, useGetSingleRoomsQuery } = roomApi;
