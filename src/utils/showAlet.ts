import Swal from "sweetalert2";

export function showAlert(title: string, message: string) {
    Swal.fire({
        title: `<span style='font-weight: bold; color: red;'>${title}</span>`,
        html: `<div><b>${message}</b></div>`,
        icon: 'warning',
        confirmButtonText: 'OK',
    });
  }