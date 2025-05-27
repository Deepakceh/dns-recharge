import { toast } from "sonner";

export const showToast = {
  success: (message: string, duration: number = 3000) =>
    toast.success(message, { duration }),

  error: (message: string, duration: number = 3000) =>
    toast.error(message, { duration }),

  info: (message: string, duration: number = 3000) =>
    toast.info(message, { duration }),

  warning: (message: string, duration: number = 3000) =>
    toast.warning(message, { duration }),

  custom: (
    message: string,
    duration: number = 3000,
    options?: any
  ) => toast(message, { duration, ...options }),
};
