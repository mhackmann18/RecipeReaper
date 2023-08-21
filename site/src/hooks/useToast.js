import { useState, useEffect } from "react";

export default function useToast() {
  const [toast, setToast] = useState({
    open: false,
    messages: [],
    activeMessage: "",
    severity: "success",
  });

  const addSuccessToastMessage = (message) => {
    setToast({
      ...toast,
      messages: [...toast.messages, message],
      severity: "success",
    });
  };

  const addErrorToastMessage = (message) => {
    setToast({
      ...toast,
      messages: [...toast.messages, message],
      severity: "error",
    });
  };

  const closeToast = () => {
    setToast({ ...toast, open: false });
  };

  useEffect(() => {
    if (!toast.open && toast.messages.length) {
      setToast({
        ...toast,
        open: true,
        activeMessage: toast.messages[0],
        messages: toast.messages.slice(1),
      });
    } else if (toast.open && toast.messages.length) {
      setToast({ ...toast, open: false });
    }
  }, [toast]);

  return {
    addSuccessToastMessage,
    addErrorToastMessage,
    closeToast,
    toast,
  };
}
