import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectSpaceProviderById } from './spaceProvidersApiSlice'

const SpaceProvider = ({ spaceProviderId }) => {
    const navigator = useNavigate()
    const spaceProvider = useSelector(state => selectSpaceProviderById(state, spaceProviderId))
    if (spaceProvider) {
        const handleEdit = () => { navigator(`dash/space-provider/d${spaceProviderId}`) }

        return (
            <tr className={` ${spaceProvider.profile_status ? 'table-primary' : 'table-danger'}`}>
                <td>
                    {spaceProvider.username}
                </td>
                <td>
                    {spaceProvider.space_ids.length}
                </td>
                <td>
                    {spaceProvider.profile_status ? 'Active' : 'Disabled'}
                </td>
                <td>
                    ...{spaceProvider.company_id.slice(-5)}
                </td>
                <td>
                    <button className='btn btn-primary' onClick={() => handleEdit()}>
                        <i className='bi bi-pencil-fill'></i>
                    </button>
                </td>
            </tr>
        )
    }
}

export default SpaceProvider