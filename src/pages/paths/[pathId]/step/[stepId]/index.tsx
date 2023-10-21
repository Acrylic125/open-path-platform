import { Button } from "@/components/ui/button";
import { MainNavbar } from "@/components/main/main-navbar";
import { MainHead } from "@/components/main/main-head";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useStartingPoint from "@/hooks/useStartingPoint";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useRef, useState } from "react";
import { Icons } from "@/components/ui/icons";

function clamp(min: number, check: number, max: number) {
  return Math.min(Math.max(check, min), max);
}

const comments: {
  id: string;
  profilePictureUrl: string;
  username: string;
  message: string;
}[] = [];
for (let i = 0; i < 20; i++) {
  comments.push({
    id: `id_${i}`,
    profilePictureUrl: "https://github.com/shadcn.png",
    username: `username_${i}`,
    message: `message_${i}`,
  });
}

function Comment({
  profilePictureUrl,
  username,
  message,
}: {
  profilePictureUrl: string;
  username: string;
  message: string;
}) {
  return (
    <Card tabIndex={0} className="flex flex-row gap-4">
      <CardHeader className="flex h-full w-12">
        <Avatar>
          <AvatarImage
            className="w-12 lg:w-16"
            src={profilePictureUrl}
            alt={username}
          />
          <AvatarFallback>{username}</AvatarFallback>
        </Avatar>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-1 p-4 lg:p-4">
        <CardTitle className="text-base lg:text-lg">{username}</CardTitle>
        <CardDescription className="lgtext-base text-sm">
          {message}
        </CardDescription>
      </CardContent>
    </Card>
  );
}

function usePanZoom() {
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

export default function Page() {
  const { startingPoint, startingPointRef } =
    useStartingPoint<HTMLDivElement>();
  // const { ref, transformStyle } = usePanZoom();

  return (
    <>
      <MainHead />

      <main className="relative flex h-screen flex-col overflow-auto">
        <div className="sticky top-0 z-50">
          <MainNavbar />
        </div>
        <div className="flex h-full w-full flex-1 flex-col md:flex-row">
          <section className="flex h-full flex-1 justify-end text-white">
            <div className="relative h-full w-full overflow-hidden bg-black lg:max-w-4xl">
              <Image
                src="https://images.unsplash.com/photo-1682685797660-3d847763208e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Image"
                className="cursor-move select-none object-contain"
                fill
                // ref={ref}
                // style={{
                //   transform: transformStyle,
                // }}
              />
              <div className="absolute flex h-48 w-full flex-col bg-gradient-to-b from-black/100 to-black/0 to-75%">
                <div className="p-8">
                  <h1 className="scroll-m-20 pb-2 text-xl font-bold tracking-tight transition-colors first:mt-0 lg:text-3xl">
                    FC6
                  </h1>
                  <p className="text-sm  text-muted">
                    Singapore Polytechnic, Singapore, Singapore
                  </p>
                </div>
              </div>
              <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 transform md:hidden">
                <div className="flex w-fit flex-row rounded-xl border border-slate-400 bg-slate-400/25 p-1 backdrop-blur-md">
                  <Button variant="ghost" size="icon">
                    <Icons.info className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Icons.comment className="h-4 w-4" />
                  </Button>
                  {/* <div className="h-full w-[1px] bg-slate-400" />
                  <Button variant="ghost" size="icon">
                    <Icons.info className="h-4 w-4" />
                  </Button> */}
                </div>
              </div>
            </div>
          </section>

          {/* Only show second row on small screens */}
          <section className="flex flex-col md:hidden">
            <ul className="flex w-full justify-center gap-4 overflow-x-auto border-t p-2 xl:gap-6">
              <li className="relative h-20 w-20 overflow-hidden rounded-sm">
                <Image
                  src="https://images.unsplash.com/photo-1682685797660-3d847763208e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Image"
                  className="object-cover"
                  fill
                />
              </li>
            </ul>
            <div className="border-t">
              <div className="flex w-full flex-row justify-between p-4">
                <Button variant="outline">Back</Button>
                <Button variant="default">Next</Button>
              </div>
            </div>
          </section>

          {/* Only show second column on large screens */}
          <section className="hidden flex-1 md:flex">
            <div className="flex w-full max-w-3xl flex-col border-r">
              <header className="flex flex-col gap-4 border-b p-4 xl:gap-8 xl:p-8">
                <div className="flex w-full flex-row justify-between">
                  <Button variant="outline">Back</Button>
                  <Button variant="default">Next</Button>
                </div>
                <div className="flex w-full flex-col gap-2 xl:gap-4">
                  <h2 className="w-full scroll-m-20 text-base font-semibold tracking-tight xl:text-xl">
                    Alternative Views
                  </h2>
                  <ul className="flex w-full gap-4 overflow-auto xl:gap-6">
                    <li className="relative h-16 w-16 overflow-hidden rounded-sm lg:h-20 lg:w-20 xl:h-28 xl:w-28">
                      <Image
                        src="https://images.unsplash.com/photo-1682685797660-3d847763208e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                        alt="Image"
                        className="object-cover"
                        fill
                      />
                    </li>
                  </ul>
                </div>
              </header>
              <div className="flex w-full flex-col items-center justify-between border-b px-4 py-2 shadow-sm xl:px-8 xl:py-4">
                <h2 className="w-full scroll-m-20 text-base font-semibold tracking-tight xl:text-xl">
                  Comments
                </h2>
              </div>
              <div
                style={{
                  height: `calc(100vh - ${startingPoint}px)`,
                }}
                ref={startingPointRef}
                className="overflow-auto px-4 py-4 xl:px-8"
              >
                <div className="grid grid-cols-1 gap-2 md:gap-4">
                  {comments.map((c) => (
                    <Comment
                      key={c.id}
                      profilePictureUrl={c.profilePictureUrl}
                      username={c.username}
                      message={c.message}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
