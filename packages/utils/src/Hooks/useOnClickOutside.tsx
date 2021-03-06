import { useEffect, useCallback } from "react";

const events = ["mousedown", "touchstart"];

export const useOnClickOutside = (
  refs: any[] = [],
  handler: any,
  inputs = []
) => {
  if (!handler || typeof handler !== "function") {
    throw new Error("[useOnClickOutside]: handler should be a function");
  }

  const refHandle = useCallback(handler, inputs);

  useEffect(() => {
    const listener = (event: any) => {
      if (!Array.isArray(refs)) {
        refs = [refs];
      }

      if (
        refs.find(
          ref =>
            !ref.current ||
            ref.current.contains(event.target) ||
            event.button !== 0
        )
      ) {
        return;
      }

      refHandle(event);
    };

    events.forEach(event => {
      document.addEventListener(event, listener);
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, listener);
      });
    };
  }, [refHandle]);
};
