import { toast } from 'react-toastify';

const ErrorToast = (str: string) => {
  return toast(str, {
    type: 'error',
    position: 'top-center',
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
  });
};

const DefaultToast = (str: string) => {
  return toast(str, {
    type: 'default',
    position: 'top-center',
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
  });
};

const SuccessToast = (str: string) => {
  return toast(str, {
    type: 'success',
    position: 'top-center',
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
  });
};

export { ErrorToast, DefaultToast, SuccessToast };
