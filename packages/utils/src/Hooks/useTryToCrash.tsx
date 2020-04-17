import { useEffect, useState } from "react";

export const useTryToCrash = () => {
  const [shouldCrash, setShouldCrash] = useState(false);

  const fn = async (okToCrash: any) => {
    if (okToCrash)
      setShouldCrash(() => {
        throw new Error(typeof okToCrash !== "boolean" ? okToCrash : "Error");
      });
  };

  useEffect(() => {
    fn(shouldCrash);
  }, [shouldCrash]);

  return setShouldCrash;
};
