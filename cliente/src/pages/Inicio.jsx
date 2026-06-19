import React, { useState, useEffect } from 'react';
import { Calendar, ShieldCheck, User } from 'lucide-react';
import { dummyAdminDashboardData, dummyEmployeeDashboardData } from '../assets/assets';
import { showLoading, hideLoading } from '../components/Loading';
import AdministradorDashboard from '../components/Dashboard/AdministradorDashboard';
import EmpleadoDashboard from '../components/Dashboard/EmpleadoDashboard';

const Inicio = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const role = localStorage.getItem('role') || 'Empleado';

  useEffect(() => {
    // Mostrar cargador de SweetAlert
    showLoading('Cargando Dashboard', 'Obteniendo la información más reciente...');

    const timer = setTimeout(() => {
      if (role === 'Administrador') {
        setData(dummyAdminDashboardData);
      } else {
        setData(dummyEmployeeDashboardData);
      }
      setLoading(false);
      hideLoading();
    }, 1200);

    return () => {
      clearTimeout(timer);
      hideLoading();
    };
  }, [role]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 font-medium animate-pulse">Cargando información...</p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const isAdmin = role === 'Administrador';

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-blue-600 via-blue-700 to-indigo-800 text-white p-6 sm:p-8 md:p-10 shadow-xl shadow-blue-900/10">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-white/5 blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-1/3 w-[250px] h-[250px] rounded-full bg-indigo-500/10 blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold tracking-wide text-blue-100 mb-4">
              {isAdmin ? <ShieldCheck size={14} /> : <User size={14} />}
              Portal de {role}
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-none">
              {isAdmin ? 'Panel de Control RRHH' : `¡Hola de nuevo, ${data.employee.firstName}!`}
            </h1>
            <p className="mt-3 text-blue-100 text-sm sm:text-base max-w-xl font-medium leading-relaxed">
              {isAdmin
                ? 'Gestiona el personal, supervisa la asistencia diaria y aprueba solicitudes pendientes.'
                : `Tu puesto actual es ${data.employee.position} en el área de ${data.employee.department}.`}
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
            <Calendar className="text-blue-100" size={24} />
            <div>
              <p className="text-[11px] uppercase tracking-wider text-blue-200 font-bold">Fecha de hoy</p>
              <p className="text-sm font-bold mt-0.5">
                {new Date().toLocaleDateString('es-ES', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Render role-specific dashboard component */}
      {isAdmin ? (
        <AdministradorDashboard data={data} />
      ) : (
        <EmpleadoDashboard data={data} />
      )}
    </div>
  );
};

export default Inicio;