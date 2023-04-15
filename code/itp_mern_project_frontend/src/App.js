import { Routes, Route } from 'react-router-dom';
import Login from './features/auth/Login';
import Layout from './component/Layout';
import Public from './component/Public';
import DashLayout from './component/DashLayout';
import SpaceList from './features/spaces/SpaceList';
import SignUp from './features/auth/SignUp';
import SpaceProviderList from './features/spaceProviders/SpaceProvidersList';
import NotFound from './component/NotFound';
import Auth from './features/auth/Auth';

// Bootstrap icons css
import 'bootstrap-icons/font/bootstrap-icons.css';
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import DashBoard from './component/DashBoard';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />} >
        <Route index element={<Public />} />
        <Route path='auth' element={<Auth />} >
          <Route index element={<Login />} />
          <Route path='sign-up' element={<SignUp />} />
        </Route>
        <Route path='dash' element={<DashLayout />}>
          <Route index element={<DashBoard />} />
          <Route path='users' >
          </Route>
          <Route path='spaces' >
            <Route index element={<SpaceList />} />
          </Route>
          <Route path='space-providers' >
            <Route index element={<SpaceProviderList />} />
          </Route>
        </Route>
        <Route path='/*' element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;

/*

        */