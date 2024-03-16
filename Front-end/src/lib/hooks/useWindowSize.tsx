import debounce from "@/lib/debounce";
import { useCallback, useEffect, useState } from "react";

const useWindowSize = (): number | null => {
  const [width, setWidth] = useState<number | null>(null);

  const updateWidth = useCallback(
    debounce(() => {
      if (window) setWidth(window.innerWidth);
    }, 500), // half second
    []
  );

  useEffect(() => {
    const handleResize = () => updateWidth();
    if (typeof window !== "undefined") {
      setWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [updateWidth]);

  return width;
};

export default useWindowSize;
