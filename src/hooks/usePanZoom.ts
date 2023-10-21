import { useEffect, useRef, useState } from "react";

function clamp(min: number, check: number, max: number) {
  return Math.min(Math.max(check, min), max);
}

export default function usePanZoom() {
  const ref = useRef<HTMLImageElement>(null);
  const [scale, setScale] = useState(1);
  const [panning, setPanning] = useState(false);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const startPan = useRef<
    | {
        x: number;
        y: number;
      }
    | undefined
  >(undefined);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const panStartListener = (e: MouseEvent) => {
      e.preventDefault();
      if (e.button !== 1) return;
      startPan.current = {
        x: e.clientX,
        y: e.clientY,
      };
      setPanning(true);
    };
    const panEndListener = (e: MouseEvent) => {
      e.preventDefault();
      startPan.current = undefined;
      setPanning(false);
    };
    const panListener = (e: MouseEvent) => {
      const bb = element.getBoundingClientRect();
      const panCur = startPan.current;
      if (!panCur) return;

      const xF = 1 / (scale * 2);
      console.log(xF);
      setTranslateX(
        (cur) =>
          clamp(
            -0.5 + xF,
            cur + (e.clientX - panCur.x) / (bb.width * scale),
            0.5 - xF,
          ),
        // clamp(-0.5, cur + (e.clientX - panCur.x) / bb.width, 0.5),
      );
      setTranslateY(
        (cur) =>
          clamp(
            -0.5 + xF,
            cur + (e.clientY - panCur.y) / (bb.height * scale),
            0.5 - xF,
          ),
        // clamp(-0.5, cur + (e.clientY - panCur.y) / bb.height, 0.5),
      );
    };
    element.addEventListener("mousedown", panStartListener);
    element.addEventListener("mousemove", panListener);
    element.addEventListener("mouseup", panEndListener);
    element.addEventListener("mouseout", panEndListener);

    return () => {
      element.removeEventListener("mousedown", panStartListener);
      element.removeEventListener("mousemove", panListener);
      element.removeEventListener("mouseup", panEndListener);
      element.removeEventListener("mouseout", panEndListener);
    };
  }, [ref, setTranslateX, setTranslateY, scale]);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const listener = (e: WheelEvent) => {
      e.preventDefault();
      if (!element) return;
      const { deltaY } = e;

      const bb = element.getBoundingClientRect();
      const [cx, cy] = [bb.left + bb.width / 2, bb.top + bb.height / 2];
      const leftTopDistCenter = Math.hypot(bb.left - cx, bb.top - cy);
      const normalized: [number, number] = [
        (bb.left - cx) / leftTopDistCenter,
        (bb.top - cy) / leftTopDistCenter,
      ];
      const imageOriginalLeftTop: [number, number] = [
        cx + normalized[0] * (leftTopDistCenter / scale),
        cy + normalized[1] * (leftTopDistCenter / scale),
      ];
      const mousePositionRelOriginalLeftTop: [number, number] = [
        e.x - (imageOriginalLeftTop[0] + bb.width * -translateX),
        e.y - (imageOriginalLeftTop[1] + bb.height * -translateY),
      ];
      const focusFromCenter: [number, number] = [
        e.x - imageOriginalLeftTop[0] - (cx + bb.width * -translateX),
        e.y - imageOriginalLeftTop[1] - (cy + bb.height * -translateY),
      ];
      console.log({
        focusFromCenter,
        wheel: {
          x: e.x - imageOriginalLeftTop[0],
          y: e.y - imageOriginalLeftTop[1],
        },
        mousePositionRelOriginalLeftTop,
      });
      const focusFromCenterDist = Math.hypot(
        focusFromCenter[0],
        focusFromCenter[1],
      );
      const focusFromCenterNormalized: [number, number] = [
        focusFromCenter[0] / focusFromCenterDist,
        focusFromCenter[1] / focusFromCenterDist,
      ];
      const scaledFocusFromCenter: [number, number] = [
        focusFromCenter[0] + focusFromCenterNormalized[0] * (scale - 1),
        focusFromCenter[1] + focusFromCenterNormalized[1] * (scale - 1),
      ];

      const scaleDelta = -0.01;
      const nextScale = Math.min(Math.max(scale + deltaY * scaleDelta, 1), 10);
      const nextTranslateX = 0; //(scaledFocusFromCenter[0] - cx) / bb.width;
      const nextTranslateY = 0; //(scaledFocusFromCenter[1] - cy) / bb.height;

      console.log({
        // left: bb.left,
        // top: bb.top,
        // scaledLeft: bb.left / scale,
        // scaledTop: bb.top / scale,
        // cx,
        // cy,
        // hypot,
        // originalPoint,
        // scale,
        // x: e.x - imageOriginalLeftTop[0],
        // y: e.y - imageOriginalLeftTop[1],
        scaledFocusFromCenter,
        nextTranslateX,
        nextTranslateY,
      });

      setScale(nextScale);
      // setTranslateX(nextTranslateX);
      // setTranslateY(nextTranslateY);

      const xF = 1 / (nextScale * 2);
      setTranslateX((cur) => clamp(-0.5 + xF, cur, 0.5 - xF));
      setTranslateY((cur) => clamp(-0.5 + xF, cur, 0.5 - xF));
    };
    element.addEventListener("wheel", listener, { passive: false });

    return () => {
      element.removeEventListener("wheel", listener);
    };
  }, [
    ref,
    setScale,
    scale,
    translateX,
    setTranslateX,
    translateY,
    setTranslateY,
  ]);
  console.log(`${translateX} ${translateY} ${scale}`);

  return {
    ref,
    scale,
    translateX,
    translateY,
    transformStyle: `translate(${translateX * 100}%, ${
      translateY * 100
    }%) scale(${scale})`,
    panning,
  };
}
