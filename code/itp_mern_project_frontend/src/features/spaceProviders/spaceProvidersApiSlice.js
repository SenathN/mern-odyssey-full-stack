import { 
    createSelector, 
    createEntityAdapter 
} from '@reduxjs/toolkit'
import { apiSlice } from '../../app/api/apiSlice'

const spaceProvidersAdapter = createEntityAdapter({})
const initialState = spaceProvidersAdapter.getInitialState()

export const spaceProvidersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getSpaceProviders: builder.query({
            query: () => '/space-provider',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            // 5 - only in dev | 60 - in prod
            keepUnusedDataFor: 60,
            transformResponse: responseData => {
                const loadedSpaceProviders = responseData.map(entity => {
                    entity.id = entity._id
                    return entity
                })
                return spaceProvidersAdapter.setAll(initialState, loadedSpaceProviders)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'SpaceProvider', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'SpaceProvider', id }))
                    ]
                } else return [{ type: 'SpaceProvider', id: 'LIST' }]
            }
        })
    })
})

export const {
    useGetSpaceProvidersQuery
} = spaceProvidersApiSlice

// return the query result object
export const selectSpaceProvidersResult = spaceProvidersApiSlice.endpoints.getSpaceProviders.select()

// memoized selector export
const selectSpaceProvidersData = createSelector(
    selectSpaceProvidersResult,
    spaceProvidersResult => spaceProvidersResult.data // normalized with id and entities
)

export const {
    selectAll: selectAllSpaceProviders,
    selectById: selectSpaceProviderById,
    selectIds: selectSpaceProviderIds
} = spaceProvidersAdapter.getSelectors(state => selectSpaceProvidersData(state) ?? initialState)

