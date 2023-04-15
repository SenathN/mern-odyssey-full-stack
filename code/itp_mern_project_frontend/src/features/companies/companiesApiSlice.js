import { 
    createSelector, 
    createEntityAdapter 
} from '@reduxjs/toolkit'
import { apiSlice } from '../../app/api/apiSlice'

const companiesAdapter = createEntityAdapter({})
const initialState = companiesAdapter.getInitialState()

export const companiesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCompanies: builder.query({
            query: () => '/company',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            // 5 - only in dev | 60 - in prod
            keepUnusedDataFor: 60,
            transformResponse: responseData => {
                const loadedCompanies = responseData.map(entity => {
                    entity.id = entity._id
                    return entity
                })
                return companiesAdapter.setAll(initialState, loadedCompanies)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Company', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Company', id }))
                    ]
                } else return [{ type: 'Company', id: 'LIST' }]
            }
        })
    })
})

export const {
    useGetCompaniesQuery
} = companiesApiSlice

// return the query result object
export const selectCompaniesResult = companiesApiSlice.endpoints.getCompanies.select()

// memoized selector export
const selectCompaniesData = createSelector(
    selectCompaniesResult,
    companiesResult => companiesResult.data // normalized with id and entities
)

export const {
    selectAll: selectAllCompanies,
    selectById: selectCompanyById,
    selectIds: selectCompanyIds
} = companiesAdapter.getSelectors(state => selectCompaniesData(state) ?? initialState)

