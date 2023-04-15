import React from 'react'
import { useGetSpacesQuery } from './spacesApiSlice'
import Space from './Space';

const SpaceList = () => {

  const {
    data: spaces,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetSpacesQuery() || {}

  let content;

  if (isLoading) content = <p className='display-6'>Loading</p>
  if (isError) content = <p className='display-6 text-danger'>An Error Occured : {error?.data?.message}</p>

  if (isSuccess) {
    const { ids } = spaces

    const tabledContent = ids?.length
      ? ids.map(spaceId => <Space key={spaceId} spaceId={spaceId} />)
      : null

    content =
      <table className='table'>
        <thead>
          <tr>
            <th className='col'>ID</th>
            <th className='col'>Space name</th>
            <th className='col'>Provider</th>
            <th className='col'>Edit</th>
          </tr>
        </thead>
        <tbody>
          {tabledContent}
        </tbody>
      </table>

    return (
      <div className=' container mw-75 overflow-auto'>
        <h2 className='fs-2 text-center'>Spaces</h2>
        {content}
      </div>
    )
  }
}
export default SpaceList