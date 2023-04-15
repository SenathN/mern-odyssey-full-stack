import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div>
      <h1>404</h1>
      <h3>The page your are looking for is not found. </h3>

      <Link to={'/'}>
        <button>
          Go back to home
        </button>
      </Link>
    </div>
  )
}

export default NotFound