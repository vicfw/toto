"use client";

import { ReactNode } from "react";
import { ToastContainer, toast, ToastOptions } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

type ToastProviderProps = {
  children: ReactNode;
};

// تنظیمات گلوبال برای تمام پروژه
const toastConfig: ToastOptions = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "light",
};

export const ToastProvider = ({ children }: ToastProviderProps) => {
  return (
    <>
      {children}
      <ToastContainer {...toastConfig} />
    </>
  );
};

export const showToast = (message: string, type: "success" | "error" | "info" | "warning" = "info") => {
  switch (type) {
    case "success":
      toast.success(message);
      break;
    case "error":
      toast.error(message);
      break;
    case "warning":
      toast.warn(message);
      break;
    default:
      toast.info(message);
      break;
  }
};
