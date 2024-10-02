import { baseApi } from "../../api/baseApi";

const slotApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Mutation to add a new slot
        addSlot: builder.mutation({
            query: (slotInfo) => ({
                url: '/slots',
                method: 'POST',
                body: slotInfo,
            }),
            invalidatesTags: ['slots'],  // Invalidate the cache to refresh the slots data
        }),

        // Query to get all slots
        getSlots: builder.query({
            query: () => ({
                url: '/slots',
                method: 'GET',
            }),
            providesTags: ['slots'],
        }),

        // Query to get a single slot by ID
        getSingleSlot: builder.query({
            query: ({ slotId }) => ({
                url: `/slots/${slotId}`,
                method: 'GET',
            }),
            providesTags: ['slots'],
        }),

        // Mutation to update an existing slot by ID
        updateSlot: builder.mutation({
            query: ({ slotId, slotInfo }) => ({
                url: `/slots/${slotId}`,
                method: 'PUT',
                body: slotInfo,
            }),
            invalidatesTags: ['slots'],
        }),

        // Mutation to delete a slot by ID
        deleteSlot: builder.mutation({
            query: (slotId) => ({
                url: `/slots/${slotId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['slots'],  // Invalidate the cache to refresh after deletion
        }),
    }),
});

export const {
    useAddSlotMutation,
    useGetSlotsQuery,
    useGetSingleSlotQuery,
    useUpdateSlotMutation,
    useDeleteSlotMutation
} = slotApi;
