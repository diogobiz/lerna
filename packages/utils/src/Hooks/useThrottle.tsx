import { useRef, useEffect, useCallback } from "react";

export function useThrottle(fun: any, timeout: any) {
  const timer = useRef<any>(null);

  const cancel = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);

      timer.current = null;
    }
  }, [timer]);

  useEffect(() => {
    cancel();
  }, [cancel]);

  return (...args: any) => {
    cancel();

    timer.current = setTimeout(() => {
      timer.current = null;

      fun.apply(this, args);
    }, timeout);
  };
}
