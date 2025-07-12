import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './Pages/Layout/Layout';
import Home from './Pages/Home/Home';
import Profile from './Pages/Profile/Profile';
import 'bootstrap/dist/css/bootstrap.min.css';
import PrivateRoute from './Components/PrivateRoute';
import Login from './Pages/Login/Login';
import SignUp from './Pages/SignUp/SignUp';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>



          <Route>
          <Route path="/" element={<Layout />} />
          <Route path="/Home" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/Profile" element={<Profile />} />
          </Route>


          <Route path="/Login" element={<Login />} />
          <Route path="/Sign-up" element={<SignUp />} />

        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
