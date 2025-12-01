import { Link, useLocation } from "react-router-dom";

export const Navbar = () => {
  const location = useLocation();
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <i className="fas fa-address-book me-2"></i>
          Agenda de Contactos
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link 
                to="/contacts" 
                className={`nav-link ${location.pathname === '/contacts' ? 'active' : ''}`}
              >
                <i className="fas fa-list me-1"></i>
                Ver Contactos
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/contacts/add" 
                className={`nav-link ${location.pathname === '/contacts/add' ? 'active' : ''}`}
              >
                <i className="fas fa-plus me-1"></i>
                Nuevo Contacto
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};