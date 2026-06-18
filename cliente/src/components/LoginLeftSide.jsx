import React, { useState, useEffect } from 'react';
import {
    Users,
    Clock,
    CreditCard,
    ShieldCheck,
    Sparkles,
    Activity,
    TrendingUp,
    Briefcase
} from 'lucide-react';

const LoginLeftSide = () => {
    const [activeSlide, setActiveSlide] = useState(0);

    const slides = [
        {
            icon: Users,
            title: "Gestión de Personal Simplificada",
            description: "Administra expedientes digitales, contratos y toda la información de tus colaboradores en un solo lugar seguro.",
            metric: "150+ Empleados Activos",
            metricIcon: Users,
            metricColor: "text-emerald-600 bg-emerald-50 border-emerald-100"
        },
        {
            icon: Clock,
            title: "Control de Asistencia en Tiempo Real",
            description: "Monitorea entradas, salidas, horas extra y retrasos de manera automática y geolocalizada.",
            metric: "98.4% Puntualidad Promedio",
            metricIcon: Activity,
            metricColor: "text-amber-600 bg-amber-50 border-amber-100"
        },
        {
            icon: CreditCard,
            title: "Cálculo Automatizado de Nóminas",
            description: "Genera recibos de pago, calcula deducciones, bonos e impuestos de forma precisa y sin complicaciones.",
            metric: "Nómina Procesada 100% Ok",
            metricIcon: ShieldCheck,
            metricColor: "text-blue-600 bg-blue-50 border-blue-100"
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const ActiveIcon = slides[activeSlide].icon;

    return (
        <div className="relative hidden lg:flex lg:w-1/2 xl:w-3/5 bg-linear-to-br from-blue-50/80 via-white to-slate-50/50 flex-col justify-between p-12 overflow-hidden h-full border-r border-blue-100/30">
            {/* Background Ambient Glows */}
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-blue-500/10 blur-[120px] animate-pulse-slow"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-500/8 blur-[100px] animate-pulse-slow"></div>

            {/* Header Logo */}
            <div className="relative z-10 flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-600 shadow-md shadow-blue-500/20">
                    <Briefcase className="w-5 h-5 text-white" />
                </div>
                <div>
                    <span className="text-xl font-bold text-slate-900 tracking-wide">Talent<span className="text-blue-600">Flow</span></span>
                    <span className="block text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Recursos Humanos</span>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="relative z-10 my-auto max-w-lg">
                {/* Animated Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50/50 border border-blue-100/80 text-blue-700 text-xs font-semibold mb-6">
                    <Sparkles className="w-3.5 h-3.5 text-blue-500 animate-spin-slow" />
                    <span>Portal de Empleados & RRHH</span>
                </div>

                {/* Feature Slides Content */}
                <div className="h-48 flex flex-col justify-center">
                    <div className="transition-all duration-500 transform translate-y-0 opacity-100">
                        <h1 className="text-4xl xl:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
                            {slides[activeSlide].title}
                        </h1>
                        <p className="text-slate-600 text-base xl:text-lg leading-relaxed">
                            {slides[activeSlide].description}
                        </p>
                    </div>
                </div>

                {/* Dynamic Metric Card (Frosted Glass Graphic) */}
                <div className="mt-8 relative group">
                    <div className="absolute -inset-0.5 bg-linear-to-r from-blue-500 to-emerald-500 rounded-2xl blur-lg opacity-10 group-hover:opacity-20 transition duration-1000"></div>

                    <div className="relative flex items-center justify-between p-6 bg-white/95 backdrop-blur-md border border-blue-100/80 rounded-2xl shadow-xl shadow-blue-100/10 transition-all duration-300 hover:border-blue-200">
                        <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-xl ${slides[activeSlide].metricColor} border flex items-center justify-center transition-all duration-500`}>
                                <ActiveIcon className="w-6 h-6" />
                            </div>
                            <div>
                                <span className="text-xs text-blue-900/50 font-semibold block uppercase tracking-wider">Estado del Sistema</span>
                                <span className="text-blue-950 font-extrabold text-lg tracking-wide transition-all duration-500">
                                    {slides[activeSlide].metric}
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-600 text-xs font-bold border border-emerald-100">
                            <TrendingUp className="w-3.5 h-3.5" />
                            <span>Activo</span>
                        </div>
                    </div>
                </div>

                {/* Slide Indicators */}
                <div className="flex gap-2.5 mt-8">
                    {slides.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveSlide(idx)}
                            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${idx === activeSlide ? 'w-8 bg-blue-600' : 'w-2 bg-blue-100 hover:bg-blue-200'
                                }`}
                            aria-label={`Ir al slide ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LoginLeftSide;
