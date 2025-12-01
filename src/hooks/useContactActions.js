import { contactService } from '../services/contactService';

export const useContactActions = (dispatch) => {
  const fetchContacts = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const contacts = await contactService.getContacts();
      dispatch({ type: 'SET_CONTACTS', payload: contacts });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  const createContact = async (contactData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const newContact = await contactService.createContact(contactData);
      dispatch({ type: 'ADD_CONTACT', payload: newContact });
      return newContact;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    }
  };

  const updateContact = async (id, contactData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const updatedContact = await contactService.updateContact(id, contactData);
      dispatch({ type: 'UPDATE_CONTACT', payload: updatedContact });
      return updatedContact;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    }
  };

  const deleteContact = async (id) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      await contactService.deleteContact(id);
      dispatch({ type: 'DELETE_CONTACT', payload: id });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    }
  };

  const setCurrentContact = (contact) => {
    dispatch({ type: 'SET_CURRENT_CONTACT', payload: contact });
  };

  const clearMessage = () => {
    dispatch({ type: 'CLEAR_MESSAGE' });
  };

  return {
    fetchContacts,
    createContact,
    updateContact,
    deleteContact,
    setCurrentContact,
    clearMessage
  };
};