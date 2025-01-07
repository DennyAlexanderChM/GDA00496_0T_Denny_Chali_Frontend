import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({isAllowed, children}) => {
    if (!isAllowed) {
        return <Navigate to="/" />;
    }

    // Si el usuario está autenticado, renderiza el contenido de la ruta protegida
    // children es un prop especial que contiene el contenido de la ruta
    return children ? children : <Outlet />;

}
