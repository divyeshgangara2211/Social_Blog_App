import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../logo.jsx'

function Footer() {
  return (
    <footer className="bg-black text-gray-300 py-10 border-t border-gray-800">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-wrap gap-8 justify-between items-center">
          <div className="mb-8 md:mb-0 flex flex-col items-start">
            <Logo width="36px" />
            <p className="text-xs mt-2 text-gray-500">&copy; {new Date().getFullYear()} Divyesh Gangera. All Rights Reserved.</p>
          </div>
          <div className="flex flex-wrap gap-12 text-sm">
            <div>
              <h3 className="text-xs font-semibold uppercase text-gray-400 mb-4 tracking-widest">Company</h3>
              <ul>
                <li className="mb-2"><Link to="/" className="hover:text-blue-400 transition-colors">Features</Link></li>
                <li className="mb-2"><Link to="/" className="hover:text-blue-400 transition-colors">Pricing</Link></li>
                <li className="mb-2"><Link to="/" className="hover:text-blue-400 transition-colors">Affiliate Program</Link></li>
                <li><Link to="/" className="hover:text-blue-400 transition-colors">Press Kit</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase text-gray-400 mb-4 tracking-widest">Support</h3>
              <ul>
                <li className="mb-2"><Link to="/" className="hover:text-blue-400 transition-colors">Account</Link></li>
                <li className="mb-2"><Link to="/" className="hover:text-blue-400 transition-colors">Help</Link></li>
                <li className="mb-2"><Link to="/" className="hover:text-blue-400 transition-colors">Contact Us</Link></li>
                <li><Link to="/" className="hover:text-blue-400 transition-colors">Customer Support</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase text-gray-400 mb-4 tracking-widest">Legals</h3>
              <ul>
                <li className="mb-2"><Link to="/" className="hover:text-blue-400 transition-colors">Terms &amp; Conditions</Link></li>
                <li className="mb-2"><Link to="/" className="hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
                <li><Link to="/" className="hover:text-blue-400 transition-colors">Licensing</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer