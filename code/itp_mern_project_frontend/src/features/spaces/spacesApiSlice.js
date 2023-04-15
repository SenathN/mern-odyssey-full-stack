import { createSelector, createEntityAdapter } from '@reduxjs/toolkit'
import { apiSlice } from '../../app/api/apiSlice'

const SpacesAdapter = createEntityAdapter({})
const initialState = SpacesAdapter.getInitialState()

const SpacesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getSpaces: builder.query({
            query: () => '/space',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            // only in dev
            keepUnusedDataFor: 5,
            transformResponse: responseData => {
                const loadedSpaces = responseData.map(entity => {
                    entity.id = entity._id
                    return entity
                });
                return SpacesAdapter.setAll(initialState, loadedSpaces)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Space', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Space', id }))
                    ]
                } else return { type: 'Space', id: 'LIST' }
            }
        })
    })
})

export const {
    useGetSpacesQuery
} = SpacesApiSlice

// return the query result object
export const selectSpacesResult = SpacesApiSlice.endpoints.getSpaces.select()

// memoized selector export
const selectSpacesData = createSelector(
    selectSpacesResult,
    spacesResult => spacesResult.data // normalized with id and entities
)

export const {
    selectAll: selectSpaces,
    selectById: selectSpaceById,
    selectIds: selectSpaceIds
} = SpacesAdapter.getSelectors(state => selectSpacesData(state) ?? initialState)

 