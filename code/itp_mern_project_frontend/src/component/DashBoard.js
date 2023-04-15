import React from 'react'
import { Link } from 'react-router-dom';

const DashBoard = () => {
    const date = new Date();
    const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date);

    return (
        <div className='container border-start border-end p-3'>
            <p className='display-5'>Welcome Admin</p>
            <small>{today}</small>
            <div className='container row mt-3'>
                <Link to={'users'} className='col-sm-4 p-1'>
                    <button className='btn btn-light border w-100'>
                        <i className='m-5 bi bi-people-fill fs-1'/> <br/>
                        View all users
                    </button>
                </Link>
                <Link to={'spaces'} className='col-sm-4 p-1'>
                <button className='btn btn-light border w-100'>
                        <i className='m-5 bi bi-houses-fill fs-1'/> <br/>
                        View All Spaces
                    </button>
                </Link>
                <Link to={'space-providers'} className='col-sm-4 p-1'>
                <button className='btn btn-light border w-100'>
                        <i className='m-5 bi bi-person-badge-fill fs-1'/> <br/>
                        View All Space Providers
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default DashBoard