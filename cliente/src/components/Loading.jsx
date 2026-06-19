import Swal from 'sweetalert2';

export const showLoading = (title = 'Cargando...', text = 'Por favor, espere.') => {
    Swal.fire({
        title,
        text,
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        showConfirmButton: false,
        didOpen: () => {
            Swal.showLoading();
        },
        customClass: {
            popup: 'rounded-2xl shadow-xl border border-slate-100',
        }
    });
};

export const hideLoading = () => {
    Swal.close();
};

const Loading = () => {
    return null;
};

export default Loading;
