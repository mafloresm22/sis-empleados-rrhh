import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  LogIn
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Por favor completa todos los campos.');
      return;
    }

    setIsLoading(true);

    // Simulación de inicio de sesión con resolución de rol
    setTimeout(() => {
      setIsLoading(false);
      const is_admin = email.toLowerCase().includes('admin');
      const role_display = is_admin ? 'Administrador' : 'Empleado';

      // Guardar el rol en localStorage para la barra lateral
      localStorage.setItem('role', role_display);

      toast.success(`¡Sesión iniciada como ${role_display}!`);
      navigate('/inicio');
    }, 1500);
  };

  return (
    <div className="w-full lg:w-1/2 xl:w-2/5 flex flex-col justify-between p-8 sm:p-12 md:p-16 bg-white relative">
      {/* Decorative background light blur */}
      <div className="absolute top-1/4 right-[-10%] w-[300px] h-[300px] rounded-full bg-blue-500/5 blur-[80px] pointer-events-none"></div>

      {/* Top Header for Mobile/Tablet */}
      <div className="flex lg:hidden items-center gap-3 mb-8 relative z-10">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600 shadow-md shadow-blue-500/20">
          <span className="text-white font-bold text-sm">TF</span>
        </div>
        <span className="text-lg font-bold text-slate-800 tracking-wide">TalentFlow</span>
      </div>

      {/* Dummy div to align content on large screens */}
      <div className="hidden lg:block"></div>

      {/* Form Container */}
      <div className="max-w-md w-full mx-auto my-auto relative z-10">
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            Bienvenido
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Ingresa tus credenciales corporativas para acceder al sistema.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input */}
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-xs font-bold uppercase text-slate-500 tracking-wider">
              Correo Electrónico
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4.5 h-4.5" />
              </div>
              <input
                id="email"
                type="email"
                required
                placeholder="ejemplo@talentflow.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="w-full pl-11 pr-4 py-3 bg-slate-50/60 border border-slate-200/80 rounded-xl text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all duration-200"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label htmlFor="password" className="text-xs font-bold uppercase text-slate-500 tracking-wider">
                Contraseña
              </label>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4.5 h-4.5" />
              </div>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className="w-full pl-11 pr-11 py-3 bg-slate-50/60 border border-slate-200/80 rounded-xl text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all duration-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 shadow-md shadow-blue-600/10 hover:shadow-blue-600/20 active:scale-[0.98] transition-all duration-200 cursor-pointer disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4.5 h-4.5 animate-spin" />
                <span>Autenticando...</span>
              </>
            ) : (
              <>
                <LogIn className="w-4.5 h-4.5" />
                <span>Ingresar</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-slate-400 mt-8 relative z-10">
        <p>© {new Date().getFullYear()} TalentFlow Inc. Todos los derechos reservados.</p>
      </div>
    </div>
  );
};

export default LoginForm;