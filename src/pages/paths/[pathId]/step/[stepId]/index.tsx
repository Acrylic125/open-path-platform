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
import { forwardRef, type CSSProperties, type MutableRefObject } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

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

const CommentCard = forwardRef<
  HTMLDivElement,
  {
    className?: string;
    style?: CSSProperties;
    profilePictureUrl: string;
    username: string;
    message: string;
  }
>(({ className, style, profilePictureUrl, username, message }, ref) => {
  return (
    <div style={style} className={className} ref={ref}>
      <div className="h-2" />
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
      <div className="h-2" />
    </div>
  );
});
CommentCard.displayName = "CommentCard";

function CommentList({
  parentRef,
  comments,
}: {
  parentRef: Readonly<MutableRefObject<HTMLDivElement | null>>;
  comments: Comment[];
}) {
  const rowVirtualizer = useVirtualizer({
    count: comments.length,
    getScrollElement: () => parentRef.current,
    estimateSize: (i) => 116,
  });
  const items = rowVirtualizer.getVirtualItems();

  return (
    <div
      style={{
        height: `${rowVirtualizer.getTotalSize()}px`,
      }}
      className="relative w-full"
      // ref={parentRef}
    >
      <div
        style={{
          transform: `translateY(${items[0]?.start ?? 0}px)`,
        }}
        className="absolute left-0 top-0 w-full"
      >
        {items.map((virtualRow) => {
          const comment = comments[virtualRow.index];
          if (!comment) return null;

          return (
            <CommentCard
              key={comment.id}
              ref={rowVirtualizer.measureElement}
              // style={{
              //   // height: `${virtualRow.size}px`,
              //   transform: `translateY(${virtualRow.start}px)`,
              // }}
              profilePictureUrl={comment.profilePictureUrl}
              username={comment.username}
              message={comment.message}
            />
          );
        })}
      </div>
      {/* {comments.map((c) => (
        <CommentCard
          key={c.id}
          className={`h-[${}]`}
          profilePictureUrl={c.profilePictureUrl}
          username={c.username}
          message={c.message}
        />
      ))} */}
    </div>
  );
}

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
  console.log(isScreenMd);

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
                  {/* <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Icons.info className="h-4 w-4" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="bottom" className="h-3/4">
                      <div className="relative h-full overflow-auto">
                        <SheetHeader className="sticky top-0 z-10 h-fit border-b bg-background pb-1 shadow-sm">
                          <SheetTitle>Info</SheetTitle>
                        </SheetHeader>
                        <div className="grid grid-cols-1 gap-2 py-2 md:gap-4">
                          Hello
                        </div>
                      </div>
                    </SheetContent>
                  </Sheet> */}
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Icons.comment className="h-4 w-4" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="bottom" className="h-3/4">
                      {/* <div className="relative h-full overflow-auto"> */}
                      <div className="h-full">
                        {/* <SheetHeader className="sticky top-0 z-10 h-fit border-b bg-background pb-1 shadow-sm"> */}
                        <SheetHeader className="border-b pb-2 shadow-sm">
                          <SheetTitle>Comments</SheetTitle>
                        </SheetHeader>
                        <div
                          style={{
                            height: `calc(100vh - ${smScreensCommentsScrollStart}px)`,
                            contain: "strict",
                          }}
                          ref={smScreenCommentsScroll}
                          className="overflow-auto"
                        >
                          <CommentList
                            parentRef={smScreenCommentsScroll}
                            comments={comments}
                          />
                        </div>
                        {/* <div className="grid grid-cols-1 gap-2 py-2 md:gap-4">
                          <CommentList comments={comments} />
                        </div> */}
                      </div>
                    </SheetContent>
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
              <div
                style={{
                  height: `calc(100vh - ${mdScreensCommentsScrollStart}px)`,
                  contain: "strict",
                }}
                ref={mdScreenCommentsScroll}
                className="overflow-auto px-4 py-4 xl:px-8"
              >
                <CommentList
                  parentRef={mdScreenCommentsScroll}
                  comments={comments}
                />
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
