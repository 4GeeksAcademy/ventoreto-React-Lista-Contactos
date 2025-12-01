import { useContext, useReducer, createContext } from "react";
import storeReducer, { initialStore } from "../store";
import { useContactActions } from "./useContactActions";

const StoreContext = createContext();

export function StoreProvider({ children }) {
    const [store, dispatch] = useReducer(storeReducer, initialStore());
    
    // Obtener las acciones de contactos
    const contactActions = useContactActions(dispatch);
    
    // Combinar store, dispatch y acciones
    const value = {
        store,
        dispatch,
        ...contactActions
    };
    
    return (
        <StoreContext.Provider value={value}>
            {children}
        </StoreContext.Provider>
    );
}

export default function useGlobalReducer() {
    const context = useContext(StoreContext);
    if (!context) {
        throw new Error('useGlobalReducer debe ser usado dentro de StoreProvider');
    }
    return context;
}