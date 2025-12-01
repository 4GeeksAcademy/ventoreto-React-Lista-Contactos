import PropTypes from 'prop-types';

// URL de placeholder para imagen de contacto
const placeholderAvatar = 'https://ui-avatars.com/api/?background=dc3545&color=fff&name=';

export const DeleteModal = ({ show, contact, onConfirm, onCancel }) => {
  if (!show) return null;
  
  const fullName = contact ? `${contact.name} ${contact.last_name || ''}`.trim() : '';
  const avatarUrl = contact ? `${placeholderAvatar}${encodeURIComponent(contact.name.charAt(0))}` : '';

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header bg-danger text-white">
            <h5 className="modal-title">
              <i className="fas fa-exclamation-triangle me-2"></i>
              Confirmar Eliminación
            </h5>
            <button type="button" className="btn-close btn-close-white" onClick={onCancel}></button>
          </div>
          
          <div className="modal-body text-center">
            {/* Avatar del contacto */}
            {contact && (
              <div className="mb-3">
                <img 
                  src={avatarUrl} 
                  alt={fullName}
                  className="rounded-circle mb-3"
                  style={{
                    width: '80px',
                    height: '80px',
                    objectFit: 'cover',
                    border: '3px solid #dc3545'
                  }}
                />
                <h5>{fullName}</h5>
                {contact.email && (
                  <p className="text-muted mb-1">
                    <i className="fas fa-envelope me-1"></i>
                    {contact.email}
                  </p>
                )}
                {contact.phone && (
                  <p className="text-muted">
                    <i className="fas fa-phone me-1"></i>
                    {contact.phone}
                  </p>
                )}
              </div>
            )}
            
            <div className="alert alert-warning">
              <i className="fas fa-exclamation-circle me-2"></i>
              ¿Estás seguro de que deseas eliminar este contacto?
              <p className="mb-0 mt-2 text-danger">
                <small>
                  <i className="fas fa-info-circle me-1"></i>
                  Esta acción no se puede deshacer.
                </small>
              </p>
            </div>
          </div>
          
          <div className="modal-footer">
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={onCancel}
            >
              <i className="fas fa-times me-1"></i> Cancelar
            </button>
            
            <button 
              type="button" 
              className="btn btn-danger" 
              onClick={onConfirm}
            >
              <i className="fas fa-trash me-1"></i> Sí, Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

DeleteModal.propTypes = {
  show: PropTypes.bool.isRequired,
  contact: PropTypes.object,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};