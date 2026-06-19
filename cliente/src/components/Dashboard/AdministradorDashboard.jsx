import React from 'react';
import {
  Users,
  Briefcase,
  UserCheck,
  Clock,
  Calendar,
  Activity,
  ArrowRight
} from 'lucide-react';

const AdministradorDashboard = ({ data }) => {
  if (!data) return null;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1 */}
        <div className="group bg-white rounded-2xl p-6 border border-slate-100 hover:border-blue-500/30 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-start justify-between">
            <div className="p-3 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
              <Users size={24} />
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-50 text-slate-500 border border-slate-100">
              Activos
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-black text-slate-800 tracking-tight">{data.totalEmployees}</h3>
            <p className="text-xs font-semibold text-slate-400 mt-1 uppercase tracking-wider">Total Empleados</p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="group bg-white rounded-2xl p-6 border border-slate-100 hover:border-indigo-500/30 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-start justify-between">
            <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
              <Briefcase size={24} />
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-50 text-slate-500 border border-slate-100">
              Áreas
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-black text-slate-800 tracking-tight">{data.totalDepartments}</h3>
            <p className="text-xs font-semibold text-slate-400 mt-1 uppercase tracking-wider">Departamentos</p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="group bg-white rounded-2xl p-6 border border-slate-100 hover:border-emerald-500/30 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-start justify-between">
            <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
              <UserCheck size={24} />
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
              Hoy
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-black text-slate-800 tracking-tight">{data.todayAttendance}</h3>
            <p className="text-xs font-semibold text-slate-400 mt-1 uppercase tracking-wider">Asistencias Hoy</p>
          </div>
        </div>

        {/* Card 4 */}
        <div className="group bg-white rounded-2xl p-6 border border-slate-100 hover:border-rose-500/30 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-start justify-between">
            <div className="p-3 rounded-xl bg-rose-50 text-rose-600 group-hover:bg-rose-600 group-hover:text-white transition-colors duration-300">
              <Clock size={24} />
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-rose-50 text-rose-600 border border-rose-100">
              Pendientes
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-black text-slate-800 tracking-tight">{data.pendingLeaves}</h3>
            <p className="text-xs font-semibold text-slate-400 mt-1 uppercase tracking-wider">Permisos Pendientes</p>
          </div>
        </div>
      </div>

      {/* Quick Actions & System Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity Mock */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Activity className="text-blue-600" size={20} />
              <h2 className="text-lg font-bold text-slate-800">Actividad Reciente del Sistema</h2>
            </div>
            <span className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer flex items-center gap-1">
              Ver todo <ArrowRight size={12} />
            </span>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50/60 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                <div>
                  <p className="text-sm font-bold text-slate-800">Asistencia registrada</p>
                  <p className="text-xs text-slate-400 mt-0.5">David Michael marcó entrada</p>
                </div>
              </div>
              <span className="text-xs text-slate-400 font-semibold">10:42 AM</span>
            </div>
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50/60 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                <div>
                  <p className="text-sm font-bold text-slate-800">Nueva solicitud de vacaciones</p>
                  <p className="text-xs text-slate-400 mt-0.5">John Doe solicitó 2 días</p>
                </div>
              </div>
              <span className="text-xs text-slate-400 font-semibold">Ayer</span>
            </div>
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50/60 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                <div>
                  <p className="text-sm font-bold text-slate-800">Nómina generada</p>
                  <p className="text-xs text-slate-400 mt-0.5">Nóminas del mes procesadas exitosamente</p>
                </div>
              </div>
              <span className="text-xs text-slate-400 font-semibold">Hace 2 días</span>
            </div>
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs">
          <h2 className="text-lg font-bold text-slate-800 mb-6">Acciones Rápidas</h2>
          <div className="space-y-3.5">
            <a
              href="/empleados"
              className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-50 hover:bg-blue-50 hover:text-blue-700 transition-all font-semibold text-sm text-slate-700 cursor-pointer border border-transparent hover:border-blue-100"
            >
              <span>Registrar Nuevo Empleado</span>
              <ArrowRight size={16} />
            </a>
            <a
              href="/nominas"
              className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-50 hover:bg-blue-50 hover:text-blue-700 transition-all font-semibold text-sm text-slate-700 cursor-pointer border border-transparent hover:border-blue-100"
            >
              <span>Generar Nóminas del Mes</span>
              <ArrowRight size={16} />
            </a>
            <a
              href="/configuracion"
              className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-50 hover:bg-blue-50 hover:text-blue-700 transition-all font-semibold text-sm text-slate-700 cursor-pointer border border-transparent hover:border-blue-100"
            >
              <span>Configurar Horarios Laborales</span>
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdministradorDashboard;
