import Head from "next/head";
import Link from "next/link";
import { api } from "@/utils/api";
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
import { WheelEventHandler, useEffect, useRef, useState } from "react";

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
            className="w-16"
            src={profilePictureUrl}
            alt={username}
          />
          <AvatarFallback>{username}</AvatarFallback>
        </Avatar>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-1 p-4">
        <CardTitle className="text-base md:text-lg">{username}</CardTitle>
        <CardDescription className="text-sm md:text-base">
          {message}
        </CardDescription>
      </CardContent>
    </Card>
  );
}

function useZoom() {
  const ref = useRef<HTMLImageElement>(null);
  const [scale, setScale] = useState(1);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);

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
      const normalizedLeftTop: [number, number] = [
        (bb.left - cx) / leftTopDistCenter,
        (bb.top - cy) / leftTopDistCenter,
      ];
      const imageOriginalLeftTop: [number, number] = [
        cx + normalizedLeftTop[0] * (leftTopDistCenter / scale),
        cy + normalizedLeftTop[1] * (leftTopDistCenter / scale),
      ];
      const mousePositionRelOriginalLeftTop: [number, number] = [
        e.x - imageOriginalLeftTop[0] - bb.width * (translateX / 2),
        e.y - imageOriginalLeftTop[1] - bb.height * (translateY / 2),
      ];

      const scaleDelta = -0.01;
      const nextScale = Math.min(Math.max(scale + deltaY * scaleDelta, 1), 10);
      const nextTranslateX = (cx - mousePositionRelOriginalLeftTop[0]) / cx;
      const nextTranslateY = (cy - mousePositionRelOriginalLeftTop[1]) / cy;

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
        nextTranslateX,
        nextTranslateY,
      });

      setScale(nextScale);
      setTranslateX(nextTranslateX);
      setTranslateY(nextTranslateY);
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

  return {
    ref,
    scale,
    translateX,
    translateY,
    transformStyle: `translate(${translateX * 100}%, ${
      translateY * 100
    }%) scale(${scale})`,
  };
}

export default function Page() {
  const { startingPoint, startingPointRef } =
    useStartingPoint<HTMLDivElement>();
  const { ref, transformStyle } = useZoom();

  return (
    <>
      <MainHead />

      <main className="relative flex h-screen flex-col overflow-auto">
        <div className="sticky top-0 z-50">
          <MainNavbar />
        </div>
        <div className="flex h-full w-full flex-1 flex-col lg:flex-row">
          <section className="flex h-full flex-1 justify-end text-white">
            <div className="relative h-full w-full overflow-hidden bg-black lg:max-w-4xl">
              <Image
                src="https://images.unsplash.com/photo-1682685797660-3d847763208e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Image"
                className="object-contain"
                fill
                ref={ref}
                style={{
                  transform: transformStyle,
                }}
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
              <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 transform lg:hidden">
                <div className="w-fit rounded-xl border border-slate-400 bg-slate-400/25 p-2 backdrop-blur-md">
                  Hello
                </div>
              </div>
            </div>
          </section>

          {/* Only show second row on small screens */}
          <section className="flex flex-col lg:hidden">
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
          <section className="hidden flex-1 lg:flex">
            <div className="flex w-full max-w-3xl flex-col border-r">
              <header className="flex flex-col gap-8 border-b p-8">
                <div className="flex w-full flex-row justify-between">
                  <Button variant="outline">Back</Button>
                  <Button variant="default">Next</Button>
                </div>
                <div className="flex w-full flex-col gap-4">
                  <h2 className="w-full scroll-m-20 text-base font-semibold tracking-tight lg:text-xl">
                    Alternative Views
                  </h2>
                  <ul className="flex w-full gap-4 overflow-auto xl:gap-6">
                    <li className="relative h-24 w-24 overflow-hidden rounded-sm xl:h-28 xl:w-28">
                      <Image
                        src="https://images.unsplash.com/photo-1682685797660-3d847763208e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                        alt="Image"
                        className="object-cover"
                        fill
                      />
                    </li>
                  </ul>
                  {/* <h2 className="scroll-m-20 text-2xl font-bold tracking-tight">
                    Comments
                  </h2> */}
                </div>
              </header>
              <div className="flex w-full flex-col items-center justify-between border-b px-4 py-4 shadow-sm md:px-8">
                <h2 className="w-full scroll-m-20 text-base font-semibold tracking-tight lg:text-xl">
                  Comments
                </h2>
              </div>
              <div
                style={{
                  height: `calc(100vh - ${startingPoint}px)`,
                }}
                ref={startingPointRef}
                className="overflow-auto px-4 py-4 md:px-8"
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
