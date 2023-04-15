import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'

const Layout = () => {
  return (
    <div className='d-flex flex-column h-100 '>
      <Header />
      <main className='flex-fill'>
          <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout