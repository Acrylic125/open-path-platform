"use client";

import { type ReactNode, useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Input } from "../ui/input";

export default function StartPathLayout({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  // const [collapseHeader, setCollapseHeader] = useState(false);
  return (
    <div
      style={{ height: `calc(100vh - var(--navbar-height))` }}
      className={cn("w-full max-w-7xl border-l border-r", className)}
      // onScroll={(e) => {
      //   console.log("TTT");
      //   setCollapseHeader(e.currentTarget.scrollTop > 0);
      // }}
    >
      <div
        className={cn("w-full transition-all duration-0 ease-in-out", {
          // "translate-y-0 border-b": !collapseHeader,
          // "-translate-y-full": collapseHeader,
        })}
      >
        <section className="flex h-36 justify-end bg-black text-white sm:h-40 md:h-48">
          <div className="relative h-full w-full max-w-7xl">
            <Image
              src="https://images.unsplash.com/photo-1682685797660-3d847763208e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Image"
              className="object-cover"
              fill
            />
            <div className="absolute flex h-full w-full flex-col justify-end bg-gradient-to-t from-black/100 to-black/0 to-75%">
              <div className="p-4 md:p-6">
                <h1 className="scroll-m-20 pb-2 text-xl font-bold tracking-tight transition-colors first:mt-0 lg:text-3xl">
                  FC6
                </h1>
                <p className="text-sm text-muted">
                  Singapore Polytechnic, Singapore, Singapore
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="sticky top-0 z-10 flex w-full flex-row items-center justify-between gap-4 border-b bg-background px-4 py-2 md:px-6 md:py-4">
        <h1 className="w-full text-sm font-semibold md:text-base lg:text-lg">
          Where do you want to start from?
        </h1>
        <Input placeholder="Search for a starting point" className="max-w-md" />
      </div>
      <div>{children}</div>
    </div>
  );
}
