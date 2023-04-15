import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectSpaceById } from './spacesApiSlice'

const Space = ({ spaceId }) => {

    const navigator = useNavigate()
    const space = useSelector(state => selectSpaceById(state, spaceId))

    if (space) {
        const handleEdit = () => { navigator(`dash/space/${spaceId}`) }

    return (
        <tr>
            <td >...{space.id.slice(-5)}</td>
            <td >{space.name}</td>
            <td >...{space.provider_id?.slice(-5)}</td>
            <td >
                <button className='btn btn-primary' onClick={() => handleEdit()}>
                    <i className='bi bi-pencil-fill'></i>
                </button>
            </td>
        </tr>
    )}
}

export default Space