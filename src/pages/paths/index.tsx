import Head from "next/head";
import Link from "next/link";
import { api } from "@/utils/api";
import { Button } from "@/components/ui/button";
import { MainNavbar } from "@/components/main/main-navbar";
import { MainHead } from "@/components/main/main-head";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

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
      className="flx-row flex overflow-hidden hover:border-foreground focus:border-foreground md:flex-col"
    >
      <CardHeader className="flex-1 p-0">
        <div className="relative aspect-video h-full w-full">
          <Image
            src="https://images.unsplash.com/photo-1682685797660-3d847763208e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Image"
            fill
          />
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-2 p-4">
        <CardTitle className="text-base md:text-lg">{location}</CardTitle>
        <CardDescription className="text-sm md:text-base">
          {subLocation.join(", ")}
        </CardDescription>
      </CardContent>
      {/* <CardFooter className="border-t-2 p-4">
                  <p>View</p>
                </CardFooter> */}
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

export default function Home() {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <MainHead title="Explore Paths" />

      {/* https://stackoverflow.com/questions/46655386/when-css-position-sticky-stops-sticking */}
      <main className="relative h-screen overflow-auto">
        <MainNavbar className="sticky top-0 z-50" />
        <div className="flex w-full flex-col items-center">
          <section className="flex w-full max-w-7xl flex-col px-4 py-4 md:px-8 md:py-8">
            <header className="w-full">
              <h1 className="scroll-m-19 text-3xl font-bold first:mt-0">
                Paths
              </h1>
            </header>
            <div className="grid grid-cols-1 gap-3 py-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
          </section>
        </div>
        <div className="fixed bottom-4 right-4 z-50 flex w-fit shadow-xl">
          <Button>New Path</Button>
        </div>
      </main>
    </>
  );
}
