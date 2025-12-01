export const Footer = () => (
  <footer className="footer mt-auto py-3 bg-dark text-white">
    <div className="container text-center">
      <p className="mb-0">
        <i className="fas fa-address-book me-2"></i>
        Aplicación de Contactos - Desarrollada con React & Context API
      </p>
      <p className="mb-0">
        <small>© {new Date().getFullYear()} - Todos los derechos reservados</small>
      </p>
    </div>
  </footer>
);