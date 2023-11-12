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
import { Input } from "@/components/ui/input";
import useStartingPoint from "@/hooks/useStartingPoint";

function PathCard({
  id,
  image,
  location,
  subLocation,
}: {
  id: string;
  image: string;
  location: string;
  subLocation: string[];
}) {
  return (
    <Card
      tabIndex={0}
      className="flex h-fit overflow-hidden hover:border-foreground focus:border-foreground"
    >
      <CardHeader className="flex-1 p-0">
        <div className="relative aspect-video h-full w-full">
          <Image src={image} alt="Image" fill />
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-2 p-4">
        <CardTitle className="text-base md:text-lg">{location}</CardTitle>
        <CardDescription className="text-sm md:text-base">
          {subLocation.join(", ")}
        </CardDescription>
      </CardContent>
    </Card>
  );
}

const paths: {
  id: string;
  image: string;
  location: string;
  subLocation: string[];
}[] = [];
for (let i = 0; i < 20; i++) {
  paths.push({
    id: `id_${i}`,
    image:
      "https://images.unsplash.com/photo-1682685797660-3d847763208e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    location: `Clown Lab ${i}`,
    subLocation: ["University of Clowns", "Florida", "USA"],
  });
}

export default function Page() {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });

  // In the desktop view, there are 2 sections, the image preview and the main content.
  // The content may be scrollable but the image preview needs to stay put. Thus, we need
  // to use an overflow-auto to isolate this scrolling region.
  //
  // CSS overflow auto requires a fixed height (e.g. 240px, 100vh).
  // We want the height of the starting position list container to take up the remaining
  // height of the page. Thus, in order to calculate this, we take the current offset y position
  // from the total height of the page.
  const { startingPoint, startingPointRef } =
    useStartingPoint<HTMLDivElement>();

  return (
    <>
      <MainHead />

      {/* https://stackoverflow.com/questions/46655386/when-css-position-sticky-stops-sticking */}
      <main className="h-screen-svh relative flex flex-col overflow-auto">
        <div className="sticky top-0 z-50">
          <MainNavbar />
        </div>
        <div className="flex w-full flex-1 flex-col lg:flex-row">
          <section className="flex h-36 justify-end bg-black text-white sm:h-40 md:h-48 lg:h-full lg:flex-1">
            <div className="relative h-full w-full max-w-7xl">
              <Image
                src="https://images.unsplash.com/photo-1682685797660-3d847763208e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Image"
                className="object-cover"
                fill
              />
              <div className="absolute flex h-full w-full flex-col justify-end bg-gradient-to-t from-black/100 to-black/0 to-75% lg:block lg:bg-gradient-to-r">
                <div className="p-4 md:p-8 lg:hidden">
                  <h1 className="scroll-m-20 pb-2 text-xl font-bold tracking-tight transition-colors first:mt-0 lg:text-3xl">
                    FC6
                  </h1>
                  <p className="text-sm  text-muted">
                    Singapore Polytechnic, Singapore, Singapore
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section className="flex flex-1">
            <div className="w-full max-w-4xl border-r">
              <header className="hidden w-full border-b p-8 lg:block">
                <h1 className="scroll-m-20 pb-2 text-3xl font-bold tracking-tight transition-colors first:mt-0">
                  FC6
                </h1>
                <p className="text-muted-foreground">
                  Singapore Polytechnic, Singapore, Singapore
                </p>
              </header>
              <div className="flex w-full items-center justify-between border-b px-4 py-4 shadow-sm md:px-8">
                <h2 className="w-full scroll-m-20 text-base font-semibold tracking-tight lg:text-xl">
                  Select a Starting Point
                </h2>
                <Input placeholder="Search for a starting point" />
              </div>
              <div
                style={{
                  height: `calc(100vh - ${startingPoint}px)`,
                }}
                ref={startingPointRef}
                className="overflow-auto px-4 py-4 md:px-8"
              >
                <div className="grid grid-cols-1 gap-2 md:gap-4">
                  {paths.map((p) => (
                    <PathCard
                      key={p.id}
                      id={p.id}
                      image={p.image}
                      location={p.location}
                      subLocation={p.subLocation}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>
          {/* <section className="flex w-full max-w-7xl flex-col gap-3 px-4 py-4 md:gap-6 md:px-8 md:py-8">
            <header className="w-full">
              <h1 className="scroll-m-19 m:text-3xl text-2xl font-bold first:mt-0">
                Paths
              </h1>
            </header>
            <div className="grid grid-cols-1 gap-3 pb-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            </div>
          </section> */}
        </div>
      </main>
    </>
  );
}