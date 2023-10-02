import { useEffect, useState } from "react";

/**
 * @returns A signal property to abort api calls if the component is unmounted.
 */
export default function useSignalOnComponentUnmount() {
  const [signal, setSignal] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    setSignal(controller.signal);

    return () => {
      controller.abort();
    };
  }, []);

  return signal;
}
