import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'

const Header = () => {
    return (
        <header className='flex-item justify-content-between container-fluid jumbotron border-bottom border-3'>
            <div className='row text-center'>
                <div className='flex-item align-self-center col-sm-2 justify-content-center'>
                    <Link to='/'>
                        <img id="title_img" src='./word_logo.png' alt='logo' className='img-fluid'
                            style={{ maxHeight: '8rem', minHeight: '48px' }}
                        />
                    </Link>
                </div>
                <div className='flex-item align-self-center col-sm-8'>
                    <div id='navbar__div' className='list-inline navbar navbar-default '
                        style={{ maxWidth: '45rem' }}
                    >
                        <Link className='list-inline-item btn'>Destinations</Link>
                        <Link className='list-inline-item btn'>Home</Link>
                        <Link className='list-inline-item btn'>Gallery</Link>
                        <Link className='list-inline-item btn'>Experiences</Link>
                        <Link className='list-inline-item btn'>Reviews</Link>
                        <Link className='list-inline-item btn'>About us</Link>
                    </div>
                </div>
                <div className='flex-item align-self-center col-sm-2' style={{ minWidth: '80px' }}>
                    <Link to='/auth' className='btn btn-sm text-center '>
                        Sign in
                        <img src='./icons8-user-96.png' alt='Profile' className='img-fluid' style={{ width: '48px' }} />
                    </Link>
                </div>
            </div>
        </header >
    )
}

export default Header