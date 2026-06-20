import React from 'react';
import {
  UserCheck,
  Clock,
  DollarSign,
  Award
} from 'lucide-react';

const EmpleadoDashboard = ({ data }) => {
  if (!data) return null;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Attendance Card */}
        <div className="group bg-white rounded-2xl p-6 border border-slate-100 hover:border-blue-500/30 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-start justify-between">
            <div className="p-3 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
              <UserCheck size={24} />
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100">
              Este Mes
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-black text-slate-800 tracking-tight">
              {data.currentMonthAttendance} <span className="text-sm font-medium text-slate-400">días</span>
            </h3>
            <p className="text-xs font-semibold text-slate-400 mt-1 uppercase tracking-wider">Asistencias Acumuladas</p>
          </div>
        </div>

        {/* Leaves Card */}
        <div className="group bg-white rounded-2xl p-6 border border-slate-100 hover:border-rose-500/30 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-start justify-between">
            <div className="p-3 rounded-xl bg-rose-50 text-rose-600 group-hover:bg-rose-600 group-hover:text-white transition-colors duration-300">
              <Clock size={24} />
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-rose-50 text-rose-600 border border-rose-100">
              Solicitados
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-black text-slate-800 tracking-tight">
              {data.pendingLeaves} <span className="text-sm font-medium text-slate-400">permisos</span>
            </h3>
            <p className="text-xs font-semibold text-slate-400 mt-1 uppercase tracking-wider">Permisos Pendientes</p>
          </div>
        </div>

        {/* Salary Card */}
        <div className="group bg-white rounded-2xl p-6 border border-slate-100 hover:border-emerald-500/30 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-start justify-between">
            <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
              <DollarSign size={24} />
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
              Último Neto
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-black text-slate-800 tracking-tight">
              S/ {data.latestPayslip.netSalary.toLocaleString('es-PE')}
            </h3>
            <p className="text-xs font-semibold text-slate-400 mt-1 uppercase tracking-wider">Última Nómina Recibida</p>
          </div>
        </div>
      </div>

      {/* Quick Tasks & Information */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs lg:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <Award className="text-blue-600" size={20} />
            <h2 className="text-lg font-bold text-slate-800">Mi Desempeño y Resumen</h2>
          </div>
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg">
                {data.currentMonthAttendance > 15 ? 'A+' : 'B'}
              </div>
              <div>
                <h4 className="font-bold text-slate-800">Índice de Asistencia Excelente</h4>
                <p className="text-xs text-slate-500 mt-0.5">Has mantenido un gran récord este mes. ¡Sigue así!</p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div>
              <h4 className="font-bold text-slate-800 text-sm">¿Necesitas reportar una inasistencia?</h4>
              <p className="text-xs text-slate-500 mt-0.5">Puedes crear una nueva solicitud en el módulo correspondiente.</p>
            </div>
            <button
              onClick={() => alert('Próximamente disponible: Módulo para solicitar permisos')}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors cursor-pointer"
            >
              Solicitar Permiso
            </button>
          </div>
        </div>

        {/* Shift Info */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs">
          <h2 className="text-lg font-bold text-slate-800 mb-6">Mi Jornada Laboral</h2>
          <div className="space-y-4">
            <div className="p-3.5 rounded-xl bg-slate-50/60 border border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Horario de Entrada</p>
                <p className="text-sm font-bold text-slate-850 mt-1">09:00 AM</p>
              </div>
              <Clock className="text-slate-400" size={18} />
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50/60 border border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Horario de Salida</p>
                <p className="text-sm font-bold text-slate-850 mt-1">06:00 PM</p>
              </div>
              <Clock className="text-slate-400" size={18} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmpleadoDashboard;
