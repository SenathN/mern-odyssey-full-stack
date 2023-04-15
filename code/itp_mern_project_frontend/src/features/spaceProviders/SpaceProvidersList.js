import React from 'react'
import SpaceProvider from './SpaceProvider';
import { useGetSpaceProvidersQuery } from './spaceProvidersApiSlice';

const SpaceProviderList = () => {

  const {
    data: spaceProviders,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetSpaceProvidersQuery() || {}

  let content;
  // console.log(isSuccess)
  if (isLoading) content = <p className='display-6'>Loading</p>
  if (isError) content = <p className='display-6 text-danger'>An Error Occured : {error?.data?.message}</p>

  if (isSuccess) {
    // console.log(JSON.stringify(spaceProviders))

    const { ids } = spaceProviders

    const tabledContent = ids?.length
      ? ids?.map(spaceProviderId => <SpaceProvider key={spaceProviderId} spaceProviderId={spaceProviderId} />)
      : <tr><td>failed</td></tr>

    content =
      <table className='table table-sm'>
        <thead>
          <tr>
            <th className='col'>Username</th>
            <th className='col'>Spaces</th>
            <th className='col'>Status</th>
            <th className='col'>Company</th>
            <th className='col'>Edit</th>
          </tr>
        </thead>
        <tbody>
          {tabledContent}
        </tbody>
      </table>

    return (
      <div className='container'>
        <h2 className='fs-3 text-center my-2'> All Space Providers </h2>
        {content}
      </div>
    )
  }
}

export default SpaceProviderList