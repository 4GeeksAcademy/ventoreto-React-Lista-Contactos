import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useGlobalReducer from '../hooks/useGlobalReducer';
import { ContactCard } from '../components/ContactCard';
import { DeleteModal } from '../components/DeleteModal';

export const Contacts = () => {
  const { store, fetchContacts, deleteContact, clearMessage } = useGlobalReducer();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    if (store.message) {
      const timer = setTimeout(() => {
        clearMessage();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [store.message]);

  const handleDeleteClick = (contact) => {
    setContactToDelete(contact);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (contactToDelete) {
      await deleteContact(contactToDelete.id);
      setShowDeleteModal(false);
      setContactToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setContactToDelete(null);
  };

  // Contar contactos
  const totalContacts = store.contacts.length;

  return (
    <div className="container mt-4">
      {/* Header con estadísticas */}
      <div className="card bg-light mb-4 border-0 shadow-sm">
        <div className="card-body py-3">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="display-6 mb-0">
                <i className="fas fa-address-book text-primary me-2"></i>
                Mis Contactos
              </h1>
              <p className="text-muted mb-0">
                {totalContacts} {totalContacts === 1 ? 'contacto' : 'contactos'} en tu agenda
              </p>
            </div>
            
            <Link to="/contacts/add" className="btn btn-primary btn-lg">
              <i className="fas fa-plus me-2"></i> Nuevo Contacto
            </Link>
          </div>
        </div>
      </div>

      {/* Mensajes */}
      {store.message && (
        <div className="alert alert-success alert-dismissible fade show shadow-sm" role="alert">
          <i className="fas fa-check-circle me-2"></i>
          {store.message}
          <button type="button" className="btn-close" onClick={clearMessage}></button>
        </div>
      )}

      {store.error && (
        <div className="alert alert-danger alert-dismissible fade show shadow-sm" role="alert">
          <i className="fas fa-exclamation-circle me-2"></i>
          {store.error}
          <button type="button" className="btn-close" onClick={clearMessage}></button>
        </div>
      )}

      {/* Loading State */}
      {store.loading && !store.contacts.length && (
        <div className="text-center my-5 py-5">
          <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-3">Cargando tus contactos...</p>
        </div>
      )}

      {/* Estado vacío */}
      {!store.loading && store.contacts.length === 0 && (
        <div className="text-center my-5 py-5">
          <div className="card border-0 shadow-sm">
            <div className="card-body py-5">
              <div className="mb-4">
                <div className="rounded-circle bg-light d-inline-flex align-items-center justify-content-center" 
                  style={{ width: '120px', height: '120px' }}>
                  <i className="fas fa-user-friends fa-3x text-muted"></i>
                </div>
              </div>
              <h3 className="mb-3">No hay contactos todavía</h3>
              <p className="text-muted mb-4">Comienza agregando tu primer contacto a la agenda</p>
              <Link to="/contacts/add" className="btn btn-primary btn-lg">
                <i className="fas fa-plus me-2"></i> Crear Primer Contacto
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Grid de contactos */}
      {!store.loading && store.contacts.length > 0 && (
        <>
          {/* Filtros y búsqueda (placeholder para futuras mejoras) */}
          <div className="row mb-4">
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fas fa-search"></i>
                </span>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Buscar contactos..." 
                  disabled
                  title="Funcionalidad de búsqueda próximamente"
                />
              </div>
            </div>
            <div className="col-md-6 text-end">
              <div className="btn-group">
                <button className="btn btn-outline-secondary" disabled>
                  <i className="fas fa-sort-alpha-down"></i>
                </button>
                <button className="btn btn-outline-secondary" disabled>
                  <i className="fas fa-th-large"></i>
                </button>
                <button className="btn btn-outline-secondary" disabled>
                  <i className="fas fa-list"></i>
                </button>
              </div>
            </div>
          </div>

          {/* Contact cards */}
          <div className="row">
            {store.contacts.map((contact) => (
              <ContactCard 
                key={contact.id} 
                contact={contact} 
                onDelete={handleDeleteClick}
              />
            ))}
          </div>
        </>
      )}

      {/* Modal de Confirmación */}
      <DeleteModal 
        show={showDeleteModal}
        contact={contactToDelete}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};