import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// URL de placeholder para imagen de contacto
const placeholderAvatar = 'https://ui-avatars.com/api/?background=007bff&color=fff&name=';

export const ContactCard = ({ contact, onDelete }) => {
  const fullName = `${contact.name} ${contact.last_name || ''}`.trim();
  const address = contact.address || 'Sin dirección';
  const phone = contact.phone || 'Sin teléfono';
  const email = contact.email || 'Sin email';
  
  // Generar URL del avatar basado en el nombre
  const avatarUrl = `${placeholderAvatar}${encodeURIComponent(contact.name.charAt(0))}`;

  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="card h-100">
        <div className="card-body">
          <div className="d-flex align-items-start mb-3">
            {/* Foto redonda al lado izquierdo */}
            <div className="me-3">
              <img 
                src={avatarUrl} 
                alt={fullName}
                className="rounded-circle"
                style={{
                  width: '70px',
                  height: '70px',
                  objectFit: 'cover',
                  border: '3px solid #007bff'
                }}
              />
            </div>
            
            {/* Información del contacto */}
            <div className="flex-grow-1">
              <h5 className="card-title mb-1">{fullName}</h5>
              {contact.email && (
                <p className="card-text text-muted small mb-1">
                  <i className="fas fa-envelope me-1"></i>
                  {contact.email}
                </p>
              )}
              {contact.phone && (
                <p className="card-text text-muted small">
                  <i className="fas fa-phone me-1"></i>
                  {contact.phone}
                </p>
              )}
            </div>
          </div>
          
          {/* Dirección (si existe) */}
          {contact.address && (
            <div className="mb-3">
              <p className="card-text">
                <i className="fas fa-map-marker-alt me-2 text-primary"></i>
                <small>{contact.address}</small>
              </p>
            </div>
          )}
          
          {/* Botones de acción */}
          <div className="d-flex justify-content-between mt-3 pt-3 border-top">
            <Link 
              to={`/contacts/edit/${contact.id}`} 
              className="btn btn-outline-primary btn-sm"
            >
              <i className="fas fa-edit me-1"></i> Editar
            </Link>
            
            <button 
              className="btn btn-outline-danger btn-sm"
              onClick={() => onDelete(contact)}
            >
              <i className="fas fa-trash me-1"></i> Eliminar
            </button>
          </div>
        </div>
        
        {/* Badge de ID */}
        <div className="card-footer bg-transparent border-top-0">
          <small className="text-muted">
            <i className="fas fa-hashtag me-1"></i> ID: {contact.id}
          </small>
        </div>
      </div>
    </div>
  );
};

ContactCard.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    last_name: PropTypes.string,
    address: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string
  }).isRequired,
  onDelete: PropTypes.func.isRequired
};