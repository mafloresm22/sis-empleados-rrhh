import React, { useState, useEffect } from 'react';
import {
    Search,
    Mail,
    Phone,
    Briefcase,
    Calendar,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    Filter,
    Eye,
    Pencil,
    Trash2,
    UserPlus
} from 'lucide-react';
import { dummyEmployeeData, DEPARTMENTS } from '../../assets/assets';
import { showLoading, hideLoading } from '../../components/Loading';
import CreateEmpleados from '../../components/Empleados/createEmpleados';
import EditEmpleados from '../../components/Empleados/EditEmpleados';
import Swal from 'sweetalert2';

const Empleados = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDept, setSelectedDept] = useState('');

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(6);

    const handleSaveEmployee = (newEmp) => {
        setEmployees((prev) => [newEmp, ...prev]);
        Swal.fire({
            icon: 'success',
            title: '¡Empleado registrado!',
            text: `${newEmp.firstName || ''} ${newEmp.lastName} ha sido registrado de forma exitosa.`,
            timer: 2200,
            showConfirmButton: false,
            timerProgressBar: true,
            customClass: {
                popup: 'rounded-2xl shadow-xl'
            }
        });
    };

    const handleUpdateEmployee = (updatedEmp) => {
        setEmployees((prev) => prev.map((emp) => emp._id === updatedEmp._id ? updatedEmp : emp));
        Swal.fire({
            icon: 'success',
            title: '¡Empleado actualizado!',
            text: `${updatedEmp.firstName || ''} ${updatedEmp.lastName} ha sido actualizado de forma exitosa.`,
            timer: 2200,
            showConfirmButton: false,
            timerProgressBar: true,
            customClass: {
                popup: 'rounded-2xl shadow-xl'
            }
        });
    };

    const handleEditClick = (emp) => {
        setSelectedEmployee(emp);
        setIsEditModalOpen(true);
    };

    useEffect(() => {
        showLoading('Cargando Empleados', 'Obteniendo listado de personal...');
        const timer = setTimeout(() => {
            const extendedData = [];
            for (let i = 0; i < 5; i++) {
                dummyEmployeeData.forEach((emp, index) => {
                    extendedData.push({
                        ...emp,
                        _id: `${emp._id}-${i}`,
                        id: `${emp.id}-${i}`,
                        firstName: i === 0 ? emp.firstName : `${emp.firstName} ${String.fromCharCode(65 + i)}`,
                        email: i === 0 ? emp.email : `${emp.email.split('@')[0]}_${i}@example.com`
                    });
                });
            }
            setEmployees(extendedData);
            setLoading(false);
            hideLoading();
        }, 1000);

        return () => {
            clearTimeout(timer);
            hideLoading();
        };
    }, []);

    // Filter logic
    const filteredEmployees = employees.filter((emp) => {
        const matchesSearch =
            `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
            emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            emp.position.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesDept = selectedDept === '' || emp.department === selectedDept;

        return matchesSearch && matchesDept;
    });

    // Pagination calculations
    const totalItems = filteredEmployees.length;
    const totalPages = Math.ceil(totalItems / pageSize) || 1;

    // Guard current page range
    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [totalPages, currentPage]);

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, totalItems);
    const paginatedEmployees = filteredEmployees.slice(startIndex, endIndex);

    const handlePageSizeChange = (e) => {
        setPageSize(Number(e.target.value));
        setCurrentPage(1);
    };

    const getInitials = (firstName, lastName) => {
        return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase();
    };

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-slate-500 font-medium animate-pulse">Cargando...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Top Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-800 tracking-tight">Listado de Empleados</h1>
                    <p className="text-xs font-semibold text-slate-400 mt-1">
                        Visualiza y administra la información de los miembros del equipo.
                    </p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-md shadow-blue-500/10 active:scale-[0.98] transition-all cursor-pointer shrink-0"
                >
                    <UserPlus size={16} />
                    <span>Nuevo Empleado</span>
                </button>
            </div>

            {/* Search & Filter Bar */}
            <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
                {/* Search */}
                <div className="relative w-full md:w-96">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Search size={18} />
                    </div>
                    <input
                        type="text"
                        placeholder="Buscar por nombre, correo o puesto..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm"
                    />
                </div>

                {/* Filter Dropdown */}
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <Filter size={16} className="text-slate-400 shrink-0" />
                    <select
                        value={selectedDept}
                        onChange={(e) => {
                            setSelectedDept(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="w-full md:w-60 px-3.5 py-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-slate-700 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm cursor-pointer"
                    >
                        <option value="">Todos los Departamentos</option>
                        {DEPARTMENTS.map((dept) => (
                            <option key={dept} value={dept}>
                                {dept}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Cards Grid */}
            {paginatedEmployees.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {paginatedEmployees.map((emp) => (
                        <div
                            key={emp._id}
                            className="group bg-white rounded-2xl border border-slate-100 hover:border-blue-500/30 p-5 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                        >
                            {/* Header Info */}
                            <div>
                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-11 h-11 rounded-xl bg-linear-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-blue-500/15">
                                            {getInitials(emp.firstName, emp.lastName)}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-800 text-sm leading-snug group-hover:text-blue-600 transition-colors">
                                                {emp.firstName} {emp.lastName}
                                            </h3>
                                            <span className="inline-block text-[10px] text-slate-400 font-semibold tracking-wider uppercase mt-0.5">
                                                {emp.department}
                                            </span>
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 shrink-0">
                                        {emp.employmentStatus}
                                    </span>
                                </div>

                                <div className="mt-5 space-y-2.5 border-t border-slate-50 pt-4 text-xs text-slate-500">
                                    <div className="flex items-center gap-2">
                                        <Briefcase size={14} className="text-slate-400 shrink-0" />
                                        <span className="font-semibold text-slate-700 truncate">{emp.position}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Mail size={14} className="text-slate-400 shrink-0" />
                                        <span className="truncate">{emp.email}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Phone size={14} className="text-slate-400 shrink-0" />
                                        <span>{emp.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar size={14} className="text-slate-400 shrink-0" />
                                        <span>Ingreso: {new Date(emp.joinDate).toLocaleDateString('es-ES')}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Salary / Details Footer */}
                            <div className="mt-5 border-t border-slate-50 pt-4 flex items-center justify-between">
                                <div>
                                    <p className="text-[9px] uppercase tracking-wider font-bold text-slate-400">Salario Básico</p>
                                    <p className="text-sm font-black text-slate-800 flex items-center mt-0.5 gap-0.5">
                                        <span className="text-xs font-semibold text-slate-500">S/</span>
                                        {emp.basicSalary.toLocaleString('es-PE')}
                                    </p>
                                </div>
                                <div className='flex items-center gap-1.5'>
                                    <button className='p-2 bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-blue-600 rounded-lg border border-slate-200/60 transition-colors cursor-pointer' title='Ver detalles'>
                                        <Eye size={16} />
                                    </button>
                                    <button onClick={() => handleEditClick(emp)} className='p-2 bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-amber-600 rounded-lg border border-slate-200/60 transition-colors cursor-pointer' title='Editar'>
                                        <Pencil size={16} />
                                    </button>
                                    <button className='p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg border border-red-100/80 transition-colors cursor-pointer' title='Eliminar'>
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center shadow-xs">
                    <p className="text-slate-400 font-semibold text-sm">No se encontraron empleados con los filtros aplicados.</p>
                </div>
            )}

            {/* Pagination Footer */}
            <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Showing entries count */}
                <div className="text-xs font-semibold text-slate-400">
                    Mostrando <span className="text-slate-700">{totalItems === 0 ? 0 : startIndex + 1}</span> a{' '}
                    <span className="text-slate-700">{endIndex}</span> de{' '}
                    <span className="text-slate-700">{totalItems}</span> empleados
                </div>

                {/* Tabulator-style paginator */}
                <div className="flex items-center gap-6">
                    {/* Page size selector */}
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                        <label htmlFor="pageSizeSelect">Registros por página:</label>
                        <select
                            id="pageSizeSelect"
                            value={pageSize}
                            onChange={handlePageSizeChange}
                            className="bg-slate-50 border border-slate-200/80 rounded-lg px-2 py-1 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 cursor-pointer text-xs font-bold"
                        >
                            <option value="6">6</option>
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                        </select>
                    </div>

                    {/* Navigation buttons */}
                    <div className="flex items-center gap-1.5">
                        {/* First Page */}
                        <button
                            onClick={() => setCurrentPage(1)}
                            disabled={currentPage === 1}
                            className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer disabled:cursor-not-allowed transition-colors"
                            title="Primera página"
                        >
                            <ChevronsLeft size={16} />
                        </button>

                        {/* Prev Page */}
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer disabled:cursor-not-allowed transition-colors"
                            title="Página anterior"
                        >
                            <ChevronLeft size={16} />
                        </button>

                        {/* Pages list */}
                        <div className="flex items-center gap-1 text-xs font-bold">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                                <button
                                    key={p}
                                    onClick={() => setCurrentPage(p)}
                                    className={`w-8 h-8 rounded-lg border transition-colors cursor-pointer ${currentPage === p
                                        ? 'bg-blue-600 border-blue-600 text-white'
                                        : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                                        }`}
                                >
                                    {p}
                                </button>
                            ))}
                        </div>

                        {/* Next Page */}
                        <button
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer disabled:cursor-not-allowed transition-colors"
                            title="Siguiente página"
                        >
                            <ChevronRight size={16} />
                        </button>

                        {/* Last Page */}
                        <button
                            onClick={() => setCurrentPage(totalPages)}
                            disabled={currentPage === totalPages}
                            className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer disabled:cursor-not-allowed transition-colors"
                            title="Última página"
                        >
                            <ChevronsRight size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal para Crear Empleado */}
            <CreateEmpleados
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveEmployee}
            />

            {/* Modal para Editar Empleado */}
            <EditEmpleados
                isOpen={isEditModalOpen}
                onClose={() => {
                    setIsEditModalOpen(false);
                    setSelectedEmployee(null);
                }}
                onSave={handleUpdateEmployee}
                employee={selectedEmployee}
            />
        </div>
    );
};

export default Empleados;