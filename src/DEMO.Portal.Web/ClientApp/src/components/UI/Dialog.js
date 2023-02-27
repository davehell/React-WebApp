import Swal from "sweetalert2";
import { t } from "../../localization/i18n";

export const dialog = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-primary',
    cancelButton: 'btn btn-secondary'
  },
  buttonsStyling: false
});

export const confirm = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-primary me-3',
    cancelButton: 'btn btn-secondary'
  },
  buttonsStyling: false,
  icon: "question",
  allowEnterKey: false,
  showCancelButton: true,
  confirmButtonText: t("yes"),
  cancelButtonText: t("no")
});

export const toast = Swal.mixin({
  position: "bottom",
  showConfirmButton: false,
  timer: 5000,
  toast: true
});

export function errorDialog(text) {
  dialog.fire({
    icon: "error",
    title: t("serverErrorTitle"),
    html: text ? text.replace(/\n/g, "<br/>") : ""
  });
}

export function warningDialog(text) {
  dialog.fire({
    icon: "warning",
    title: t("warning"),
    html: text ? text.replace(/\n/g, "<br/>") : ""
  });
}

export function successDialog(text) {
  toast.fire({
    icon: "success",
    text: text
  });
}