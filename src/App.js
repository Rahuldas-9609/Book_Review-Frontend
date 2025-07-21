import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Layout from './Pages/Layout/Layout';
import Home from './Pages/Home/Home';
import Profile from './Pages/Profile/Profile';
import 'bootstrap/dist/css/bootstrap.min.css';
import PrivateRoute from './Components/PrivateRoute';
import Login from './Pages/Login/Login';
import SignUp from './Pages/SignUp/SignUp';
import ReviewPage from './Pages/Review/Review';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Layout route with nested protected routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<PrivateRoute><Home /></PrivateRoute>} />
          
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />


        </Route>

        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/review" element={<ReviewPage />} />
       
       
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
