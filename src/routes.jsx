import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Contacts } from "./pages/Contacts";
import { AddContact } from "./pages/AddContact";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<h1>Página no encontrada!</h1>}>
      {/* Redirigir root a /contacts */}
      <Route index element={<Contacts />} />
      
      {/* Rutas de contactos */}
      <Route path="contacts" element={<Contacts />} />
      <Route path="contacts/add" element={<AddContact />} />
      <Route path="contacts/edit/:id" element={<AddContact />} />
    </Route>
  )
);