import React, { useState } from 'react';
import { X, Save, User, Briefcase, Key } from 'lucide-react';
import Swal from 'sweetalert2';
import { DEPARTMENTS } from '../../assets/assets';

const CreateEmpleados = ({ isOpen, onClose, onSave }) => {
    const initialFormState = {
        // INFORMACION PERSONAL
        firstName: '',
        lastName: '',
        dob: '',
        personalEmail: '',
        phone: '',
        joinDate: '',

        // DETALLES DEL EMPLEADO
        department: '',
        position: '',
        basicSalary: '',
        allowances: '', // Subvención
        deductions: '',
        employmentStatus: 'ACTIVO',

        // INFORMACION EMPRESARIAL
        email: '', // Correo empresarial
        password: '',
        confirmPassword: '',
        role: 'EMPLEADO'
    };

    const [formData, setFormData] = useState(initialFormState);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validations (except firstName which is optional)
        const requiredFields = [
            { key: 'lastName', label: 'Apellidos' },
            { key: 'dob', label: 'Fecha de Nacimiento' },
            { key: 'personalEmail', label: 'Correo Personal' },
            { key: 'phone', label: 'Celular' },
            { key: 'joinDate', label: 'Día de Ingreso' },
            { key: 'department', label: 'Departamento' },
            { key: 'position', label: 'Puesto' },
            { key: 'basicSalary', label: 'Salario Básico' },
            { key: 'allowances', label: 'Subvención' },
            { key: 'deductions', label: 'Deducciones' },
            { key: 'email', label: 'Correo Empresarial' },
            { key: 'password', label: 'Contraseña' },
            { key: 'confirmPassword', label: 'Repetir Contraseña' }
        ];

        for (const field of requiredFields) {
            if (!formData[field.key]) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Campo obligatorio',
                    text: `Por favor completa el campo: ${field.label}`,
                    confirmButtonColor: '#2563eb'
                });
                return;
            }
        }

        // Password match validation
        if (formData.password !== formData.confirmPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Error de contraseña',
                text: 'Las contraseñas ingresadas no coinciden.',
                confirmButtonColor: '#2563eb'
            });
            return;
        }

        // Format new employee object
        const newEmployee = {
            ...formData,
            basicSalary: parseFloat(formData.basicSalary),
            allowances: parseFloat(formData.allowances),
            deductions: parseFloat(formData.deductions),
            // Set _id dynamically for mock purposes
            _id: `mock-${Date.now()}`,
            id: `mock-${Date.now()}`
        };

        onSave(newEmployee);

        // Clear and close
        setFormData(initialFormState);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-fade-in">
            {/* Modal Card */}
            <div className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-100 flex flex-col my-8 animate-slide-down">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-slate-150">
                    <div>
                        <h2 className="text-xl font-black text-slate-800 tracking-tight">Agregar Nuevo Empleado</h2>
                        <p className="text-xs text-slate-400 mt-1">Completa los campos para registrar un nuevo integrante.</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-xl transition-all cursor-pointer border border-transparent hover:border-slate-150"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-8 max-h-[70vh] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full">

                    {/* SECTION 1: INFORMACION PERSONAL */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                            <User size={18} className="text-blue-600" />
                            <h3 className="text-sm font-black text-slate-850 uppercase tracking-wider">Información Personal</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                                    Primer y Segundo Nombres
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    placeholder="Ej. Juan Carlos"
                                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                                    Apellidos <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    required
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    placeholder="Ej. Pérez Gómez"
                                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                                    Fecha de Nacimiento <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    name="dob"
                                    required
                                    value={formData.dob}
                                    onChange={handleChange}
                                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                                    Correo Personal <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    name="personalEmail"
                                    required
                                    value={formData.personalEmail}
                                    onChange={handleChange}
                                    placeholder="juan.perez@email.com"
                                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                                    Celular <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    required
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Ej. 987654321"
                                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                                    Día de Ingreso <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    name="joinDate"
                                    required
                                    value={formData.joinDate}
                                    onChange={handleChange}
                                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm"
                                />
                            </div>
                        </div>
                    </div>

                    {/* SECTION 2: DETALLES DEL EMPLEADO */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                            <Briefcase size={18} className="text-blue-600" />
                            <h3 className="text-sm font-black text-slate-850 uppercase tracking-wider">Detalles del Empleado</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                                    Departamento <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="department"
                                    required
                                    value={formData.department}
                                    onChange={handleChange}
                                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm cursor-pointer"
                                >
                                    <option value="">Selecciona Departamento</option>
                                    {DEPARTMENTS.map((dept) => (
                                        <option key={dept} value={dept}>
                                            {dept}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                                    Puesto <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="position"
                                    required
                                    value={formData.position}
                                    onChange={handleChange}
                                    placeholder="Ej. Desarrollador Web"
                                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                                    Salario Básico (S/) <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    name="basicSalary"
                                    required
                                    min="0"
                                    step="0.01"
                                    value={formData.basicSalary}
                                    onChange={handleChange}
                                    placeholder="0.00"
                                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                                    Subvención / Asignación (S/) <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    name="allowances"
                                    required
                                    min="0"
                                    step="0.01"
                                    value={formData.allowances}
                                    onChange={handleChange}
                                    placeholder="0.00"
                                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                                    Deducciones (S/) <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    name="deductions"
                                    required
                                    min="0"
                                    step="0.01"
                                    value={formData.deductions}
                                    onChange={handleChange}
                                    placeholder="0.00"
                                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                                    Estado <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="employmentStatus"
                                    value={formData.employmentStatus}
                                    onChange={handleChange}
                                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm cursor-pointer font-semibold"
                                    disabled
                                >
                                    <option value="ACTIVO">ACTIVO</option>
                                    <option value="INACTIVO">INACTIVO</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* SECTION 3: INFORMACION EMPRESARIAL */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                            <Key size={18} className="text-blue-600" />
                            <h3 className="text-sm font-black text-slate-850 uppercase tracking-wider">Información Empresarial</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                                    Correo Empresarial <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="ejemplo@talentflow.com"
                                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                                    Contraseña <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••••••"
                                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                                    Repetir Contraseña <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    required
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="••••••••••••"
                                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm"
                                />
                            </div>
                        </div>
                    </div>
                </form>

                {/* Footer Actions */}
                <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-150 bg-slate-50 rounded-b-3xl">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-5 py-2.5 rounded-xl bg-red-500 text-amber-50 border border-red-100 hover:bg-red-100 hover:text-red-700 font-bold text-sm transition-all duration-200 cursor-pointer"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSubmit}
                        type="submit"
                        className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-md shadow-blue-500/15 hover:shadow-blue-500/25 active:scale-[0.98] transition-all cursor-pointer"
                    >
                        <Save size={16} />
                        <span>Guardar Empleado</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateEmpleados;
