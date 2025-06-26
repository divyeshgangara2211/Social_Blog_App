import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container , Logo , LogoutBtn } from '../index.js'
import { Link } from 'react-router-dom';

function Header() {
  const authStatus = useSelector( (state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    { name : 'Home', slug : '/', active : true },
    { name : 'Login', slug : '/login', active : !authStatus },
    { name : 'Signup', slug : '/signup', active : !authStatus },
    { name : 'All Posts', slug : '/all-posts', active : authStatus },
    { name : 'Add post', slug : '/add-post', active : authStatus },
  ];

  return (
    <header className='py-3 shadow-lg bg-black text-white sticky top-0 z-50'>
      <Container>
        <nav className='flex items-center'>  
          <div className='mr-6'>
            <Link to='/'>
              <span className='transition-transform duration-300 hover:scale-110 block'>
                <Logo width='70px'/>
              </span>
            </Link>
          </div>
          <ul className='flex ml-auto gap-2'>
            {navItems.map((item) => item.active ? (
              <li key={item.name}>
                <button
                  onClick={() => navigate(item.slug)}
                  className='px-5 py-2 rounded-full font-medium transition-all duration-200 hover:bg-blue-600 hover:text-white focus:bg-blue-700 focus:outline-none bg-gray-900 text-gray-200 shadow-sm'
                >
                  {item.name}
                </button>
              </li>
            ) : null)}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header