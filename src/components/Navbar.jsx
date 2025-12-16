import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">🌊</span>
          <span className="brand-text">BlueCarbon-X</span>
        </Link>

        <div className="navbar-links">
          <Link 
            to="/" 
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
          >
            Dashboard
          </Link>
          <Link 
            to="/submit" 
            className={`nav-link ${isActive('/submit') ? 'active' : ''}`}
          >
            Submit Project
          </Link>
          <Link 
            to="/analysis" 
            className={`nav-link ${isActive('/analysis') ? 'active' : ''}`}
          >
            AI Analysis
          </Link>
          <Link 
            to="/wallet" 
            className={`nav-link ${isActive('/wallet') ? 'active' : ''}`}
          >
            Wallet
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

