import { Button } from "@/components/ui/button";
import { MainNavbar } from "@/components/main/main-navbar";
import {
  Card,
  CardContent,
  CardDescription,
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
      className="flex overflow-hidden hover:border-foreground focus:border-foreground md:flex-col"
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
      <div className="flex w-full flex-col items-center">
        <section className="flex w-full max-w-7xl flex-col gap-3 px-4 py-4 md:gap-6 md:px-8 md:py-8">
          <header className="w-full">
            <h1 className="scroll-m-19 m:text-3xl text-2xl font-bold first:mt-0">
              Paths
            </h1>
          </header>
          <div className="grid grid-cols-1 gap-3 pb-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
      <div className="fixed bottom-6 right-6 z-50 flex w-fit shadow-2xl md:hidden">
        <Button size="lg">New Path</Button>
      </div>
    </>
  );
}
