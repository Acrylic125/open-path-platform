import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { number } from "zod";
import Link from "next/link";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const steps: {
  id: string;
  image: string;
}[] = [];
for (let i = 0; i < 20; i++) {
  steps.push({
    id: `id_${i}`,
    image:
      "https://images.unsplash.com/photo-1682685797660-3d847763208e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  });
}

// eslint-disable-next-line @typescript-eslint/require-await
async function getPageData(id: string | number) {
  const stepIndex = steps.findIndex((s) => s.id === id);
  return {
    step: steps[stepIndex],
    prevStepId: steps[stepIndex - 1]?.id,
    nextStepId: steps[stepIndex + 1]?.id,
    stepNumber: stepIndex + 1,
    totalSteps: steps.length,
  };
}

export default async function Page({
  params: { stepId, pathId },
}: {
  params: { stepId: string; pathId: string };
}) {
  const { step, stepNumber, totalSteps, prevStepId, nextStepId } =
    await getPageData(stepId);

  return (
    <div className="flex flex-1 flex-col items-center bg-slate-800">
      <div className="relative flex h-[var(--safe-content-height)] w-full max-w-7xl flex-col items-center overflow-auto lg:p-8">
        <div className="flex h-full w-full flex-col overflow-hidden rounded-lg lg:max-w-3xl lg:border-2 lg:border-slate-600 xl:max-w-4xl">
          <div className="relative flex w-full flex-1 flex-col items-center justify-between overflow-hidden bg-black">
            <Image
              src="https://images.unsplash.com/photo-1682685797660-3d847763208e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Image"
              className="cursor-move select-none object-contain"
              fill
              loading="lazy"
            />
            <div className="absolute flex h-48 w-full flex-col bg-gradient-to-b from-black/100 to-black/0 to-75%">
              <div className="p-4 lg:p-8">
                <h1 className="scroll-m-20 pb-2 text-xl font-bold tracking-tight text-white transition-colors first:mt-0 lg:text-3xl">
                  FC6
                </h1>
                <p className="text-sm text-muted">
                  Singapore Polytechnic, Singapore, Singapore
                </p>
              </div>
            </div>
            <div className="absolute bottom-8 flex w-fit flex-row items-center gap-1 rounded-xl border border-slate-400 bg-slate-400/25 p-1 text-slate-50 backdrop-blur-md">
              <div className="flex flex-row">
                {prevStepId ? (
                  <Link href={`/paths/${pathId}/steps/${prevStepId}`} passHref>
                    <Button variant="ghost" size="icon">
                      <Icons.chevronLeft />
                    </Button>
                  </Link>
                ) : (
                  <Button disabled variant="ghost" size="icon">
                    <Icons.chevronLeft />
                  </Button>
                )}
              </div>
              <div className="h-8 w-[1px] bg-slate-400" />
              <div className="flex flex-row">
                <Button variant="ghost" size="icon">
                  <Icons.galleryVertical className="h-4 w-4" />
                </Button>
                {/* <Button variant="ghost" size="icon">
                  <Icons.comment className="h-4 w-4" />
                </Button> */}
              </div>
              <div className="h-8 w-[1px] bg-slate-400" />
              <div className="flex flex-row">
                {nextStepId ? (
                  <Link href={`/paths/${pathId}/steps/${nextStepId}`} passHref>
                    <Button variant="ghost" size="icon">
                      <Icons.chevronRight />
                    </Button>
                  </Link>
                ) : (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Icons.chevronRight />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="py-8 lg:py-12">
                      <DialogHeader>
                        <div className="flex flex-col items-center gap-4">
                          <div className="rounded-md border border-green-300 bg-green-100 p-4 text-green-600">
                            <Icons.check className="" />
                          </div>
                          <div className="flex flex-col gap-1">
                            <DialogTitle className="text-center text-lg md:text-xl lg:text-2xl">
                              You are done!
                            </DialogTitle>
                            <DialogDescription className="text-center text-base md:text-lg">
                              Well done! You have completed this path.
                            </DialogDescription>
                          </div>
                        </div>
                      </DialogHeader>
                      <DialogFooter>
                        <div className="flex w-full justify-center gap-2">
                          <DialogClose asChild>
                            <Button type="button" variant="secondary">
                              Cancel
                            </Button>
                          </DialogClose>
                          <Link href="/" passHref>
                            <Button type="button" variant="default">
                              Back to Home
                            </Button>
                          </Link>
                        </div>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
