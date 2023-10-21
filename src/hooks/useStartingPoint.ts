import { useEffect, useRef, useState } from "react";

// type ResizeListener = (e: UIEvent) => void;

export default function useStartingPoint<T extends HTMLElement>() {
  const startingPointRef = useRef<T>(null);
  const [startingPoint, setStartingPoint] = useState<number>(0);
  useEffect(() => {
    const resizeStartingPointListContainer = () => {
      if (startingPointRef.current) {
        setStartingPoint(startingPointRef.current.offsetTop);
      }
    };
    resizeStartingPointListContainer();
    window.addEventListener("resize", resizeStartingPointListContainer);
    return () => {
      window.removeEventListener("resize", resizeStartingPointListContainer);
    };
  }, [startingPointRef]);

  return {
    startingPointRef,
    startingPoint,
  };
}
