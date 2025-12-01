export const initialStore = () => {
  return {
    message: null,
    contacts: [],
    loading: false,
    error: null,
    currentContact: null
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type) {
    case 'SET_CONTACTS':
      return {
        ...store,
        contacts: action.payload,
        loading: false,
        error: null
      };
    
    case 'ADD_CONTACT':
      return {
        ...store,
        contacts: [...store.contacts, action.payload],
        message: 'Contacto agregado exitosamente'
      };
    
    case 'UPDATE_CONTACT':
      return {
        ...store,
        contacts: store.contacts.map(contact => 
          contact.id === action.payload.id ? action.payload : contact
        ),
        message: 'Contacto actualizado exitosamente',
        currentContact: null
      };
    
    case 'DELETE_CONTACT':
      return {
        ...store,
        contacts: store.contacts.filter(contact => contact.id !== action.payload),
        message: 'Contacto eliminado exitosamente'
      };
    
    case 'SET_CURRENT_CONTACT':
      return {
        ...store,
        currentContact: action.payload
      };
    
    case 'SET_LOADING':
      return {
        ...store,
        loading: action.payload
      };
    
    case 'SET_ERROR':
      return {
        ...store,
        error: action.payload,
        loading: false
      };
    
    case 'CLEAR_MESSAGE':
      return {
        ...store,
        message: null
      };
    
    default:
      throw Error('Unknown action: ' + action.type);
  }    
}