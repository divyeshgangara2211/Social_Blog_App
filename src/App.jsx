import './App.css';
import React, { useState, useEffect, use } from 'react';
import { useDispatch } from 'react-redux';
import authService from './services/auth.js';
import { login ,logout } from './store/authSlice.js';
import { Header , Footer } from './components/index.jsx';
import { Outlet } from 'react-router-dom';


function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then( (userData) => {
        if(userData){
          dispatch(login(userData));
        }else{
          dispatch(logout());
        }
      })
      .catch((error) => {
        console.error('Error fetching current user:', error);
        dispatch(logout());
      })
      .finally( () => setLoading(false));

  }, []);

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-black'>
      <div className='w-full block'>
        <Header />
        <main>
          {/* <Outlet /> */}
        </main>
        <Footer />
      </div>
    </div>
  ) : null ;
  
}

export default App
