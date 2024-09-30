import { baseApi } from "../../api/baseApi";

const slotApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addSlot: builder.mutation({
            query: (slotInfo) => ({
                url: '/slots',
                method: 'POST',
                body: slotInfo,
            }),
        })
        ,
        getSlots: builder.query({
            query: () => {
                return {
                    url: '/slots',
                    method: "GET",
                };
            },
            providesTags: ['slots'],
        }),
    }),
});

export const { useAddSlotMutation, useGetSlotsQuery } = slotApi;
