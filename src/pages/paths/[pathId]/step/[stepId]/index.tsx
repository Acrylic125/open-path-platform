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
import { Icons } from "@/components/ui/icons";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useMediaQuery } from "usehooks-ts";
import tailwindConfig from "@/utils/tailwind";
import {
  forwardRef,
  type CSSProperties,
  useCallback,
  type RefCallback,
  useMemo,
} from "react";
import {
  List,
  AutoSizer,
  CellMeasurerCache,
  CellMeasurer,
} from "react-virtualized";
import { type MeasuredCellParent } from "react-virtualized/dist/es/CellMeasurer";
import dynamic from "next/dynamic";
import CommentList from "@/components/step-page/comment-card-list";

type Comment = {
  id: string;
  profilePictureUrl: string;
  username: string;
  message: string;
};
const comments: Comment[] = [];
comments.push({
  id: `id_test`,
  profilePictureUrl: "https://github.com/shadcn.png",
  username: `username_test`,
  message: `rkwkfmrmef mwmrfwkerf wkkmormofekmor mofemrfmo efjeriofj reiorfjerriolfejrofiejrfoefkmekorftmeorfokewkopweoiqji edjiwid wjedwjiedji`,
});
for (let i = 0; i < 20; i++) {
  comments.push({
    id: `id_${i}`,
    profilePictureUrl: "https://github.com/shadcn.png",
    username: `username_${i}`,
    message: `message_${i}`,
  });
}

const LazyCommentListAutoSizer = dynamic(
  () => import("@/components/step-page/comment-list-auto-sizer"),
  {},
);

export default function Page() {
  const {
    startingPoint: mdScreensCommentsScrollStart,
    startingPointRef: mdScreenCommentsScroll,
  } = useStartingPoint<HTMLDivElement>();
  const {
    startingPoint: smScreensCommentsScrollStart,
    startingPointRef: smScreenCommentsScroll,
  } = useStartingPoint<HTMLDivElement>();
  // const { ref, transformStyle } = usePanZoom();
  const isScreenMd = useMediaQuery(
    `(min-width: ${tailwindConfig.theme.screens.md})`,
  );

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
                <div className="p-4 lg:p-8">
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
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Icons.comment className="h-4 w-4" />
                      </Button>
                    </SheetTrigger>
                    {/* Lazy load in if screen size is small enough */}
                    {!isScreenMd && (
                      <SheetContent side="bottom" className="h-3/4 p-0">
                        {/* <div className="relative h-full overflow-auto"> */}
                        <div className="flex h-full flex-col">
                          {/* <SheetHeader className="sticky top-0 z-10 h-fit border-b bg-background pb-1 shadow-sm"> */}
                          <SheetHeader className="border-b px-4 py-2 shadow-sm">
                            <SheetTitle>Comments</SheetTitle>
                          </SheetHeader>

                          <div
                            style={{
                              height: `calc(100svh - ${smScreensCommentsScrollStart}px)`,
                            }}
                            className="px-4"
                            ref={smScreenCommentsScroll}
                          >
                            <AutoSizer>
                              {({ width, height }) => (
                                <CommentList
                                  height={height}
                                  width={width}
                                  comments={comments}
                                />
                              )}
                            </AutoSizer>
                          </div>
                        </div>
                      </SheetContent>
                    )}
                  </Sheet>
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

              {/* Lazy load in if screen size is large enough */}
              <div
                style={{
                  height: `calc(100svh - ${mdScreensCommentsScrollStart}px)`,
                }}
                className="px-4 xl:px-8"
                ref={mdScreenCommentsScroll}
              >
                {isScreenMd && <LazyCommentListAutoSizer comments={comments} />}
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
