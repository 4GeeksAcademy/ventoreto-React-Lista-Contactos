const API_URL = 'https://playground.4geeks.com/contact';

export const contactService = {
  // Obtener todos los contactos
  async getContacts() {
    try {
      const response = await fetch(`${API_URL}/agendas/my_super_agenda/contacts`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Error al obtener contactos');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error en getContacts:', error);
      throw error;
    }
  },

  // Crear un nuevo contacto
  async createContact(contactData) {
    try {
      const response = await fetch(`${API_URL}/agendas/my_super_agenda/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(contactData)
      });
      
      if (!response.ok) {
        throw new Error('Error al crear contacto');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error en createContact:', error);
      throw error;
    }
  },

  // Actualizar un contacto existente
  async updateContact(id, contactData) {
    try {
      const response = await fetch(`${API_URL}/agendas/my_super_agenda/contacts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(contactData)
      });
      
      if (!response.ok) {
        throw new Error('Error al actualizar contacto');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error en updateContact:', error);
      throw error;
    }
  },

  // Eliminar un contacto
  async deleteContact(id) {
    try {
      const response = await fetch(`${API_URL}/agendas/my_super_agenda/contacts/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error('Error al eliminar contacto');
      }
      
      return true;
    } catch (error) {
      console.error('Error en deleteContact:', error);
      throw error;
    }
  }
};