import { Navigate, Route, Routes } from "react-router-dom"
import Login from "./pages/Login/LoginLanding"
import Layout from "./pages/Layout"
import Inicio from "./pages/Inicio"
import Empleados from "./pages/Empleados/Empleados"
import Asistencia from "./pages/Empleados/Asistencia"
import Nominas from "./pages/Nominas/Nominas"
import Configuracion from "./pages/Configuracion"
import ImprimirNomina from "./pages/Nominas/ImprimirNomina"
const App = () => {
  return (
    <>
      <div className="min-h-screen bg-slate-100">
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route element={<Layout />}>
            <Route path="/inicio" element={<Inicio />} />
            <Route path="/empleados" element={<Empleados />} />
            <Route path="/asistencias" element={<Asistencia />} />
            <Route path="/cerrar-sesion" element={<Login />} />
            <Route path="/nominas" element={<Nominas />} />
            <Route path="/configuracion" element={<Configuracion />} />
          </Route>

          <Route path="/imprimir/nominas/:id" element={<ImprimirNomina />} />
          <Route path="*" element={<Navigate to="/inicio" replace />} />

        </Routes>
      </div>
    </>
  )
}

export default App