import { toast } from "react-toastify";

export const createToast = (msg, type = "error") => {
  toast[type](msg);
};
