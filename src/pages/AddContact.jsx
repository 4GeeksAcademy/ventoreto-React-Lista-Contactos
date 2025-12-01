import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useGlobalReducer from '../hooks/useGlobalReducer';

export const AddContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { store, createContact, updateContact, fetchContacts, setCurrentContact, clearMessage } = useGlobalReducer();
  
  const [formData, setFormData] = useState({
    name: '',
    last_name: '',
    email: '',
    phone: '',
    address: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditing = !!id;

  useEffect(() => {
    if (isEditing && store.currentContact) {
      setFormData({
        name: store.currentContact.name || '',
        last_name: store.currentContact.last_name || '',
        email: store.currentContact.email || '',
        phone: store.currentContact.phone || '',
        address: store.currentContact.address || ''
      });
    }
  }, [isEditing, store.currentContact]);

  useEffect(() => {
    if (isEditing && !store.currentContact) {
      fetchContacts();
    }
  }, [isEditing]);

  useEffect(() => {
    return () => {
      clearMessage();
    };
  }, []);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }
    
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (formData.phone && !/^[0-9+\-\s()]+$/.test(formData.phone)) {
      newErrors.phone = 'Teléfono inválido';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const contactData = {
        name: formData.name.trim(),
        last_name: formData.last_name.trim(),
        email: formData.email.trim() || null,
        phone: formData.phone.trim() || null,
        address: formData.address.trim() || null
      };
      
      if (isEditing) {
        await updateContact(id, contactData);
      } else {
        await createContact(contactData);
      }
      
      navigate('/contacts');
    } catch (error) {
      console.error('Error al guardar contacto:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/contacts');
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h2 className="mb-0">
                <i className={`fas ${isEditing ? 'fa-edit' : 'fa-plus-circle'} me-2`}></i>
                {isEditing ? 'Editar Contacto' : 'Nuevo Contacto'}
              </h2>
            </div>
            
            <div className="card-body">
              {store.error && (
                <div className="alert alert-danger">
                  {store.error}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                {/* Nombre */}
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    <i className="fas fa-user me-1"></i> Nombre *
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  {errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                </div>

                {/* Apellido */}
                <div className="mb-3">
                  <label htmlFor="last_name" className="form-label">
                    <i className="fas fa-user me-1"></i> Apellido
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="last_name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                  />
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    <i className="fas fa-envelope me-1"></i> Email
                  </label>
                  <input
                    type="email"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>

                {/* Teléfono */}
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    <i className="fas fa-phone me-1"></i> Teléfono
                  </label>
                  <input
                    type="tel"
                    className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  {errors.phone && (
                    <div className="invalid-feedback">{errors.phone}</div>
                  )}
                </div>

                {/* Dirección */}
                <div className="mb-4">
                  <label htmlFor="address" className="form-label">
                    <i className="fas fa-map-marker-alt me-1"></i> Dirección
                  </label>
                  <textarea
                    className="form-control"
                    id="address"
                    name="address"
                    rows="3"
                    value={formData.address}
                    onChange={handleChange}
                  ></textarea>
                </div>

                {/* Botones */}
                <div className="d-flex justify-content-between">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleCancel}
                    disabled={isSubmitting}
                  >
                    <i className="fas fa-times me-1"></i> Cancelar
                  </button>
                  
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                        {isEditing ? 'Actualizando...' : 'Creando...'}
                      </>
                    ) : (
                      <>
                        <i className={`fas ${isEditing ? 'fa-save' : 'fa-check'} me-1`}></i>
                        {isEditing ? 'Actualizar Contacto' : 'Crear Contacto'}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};