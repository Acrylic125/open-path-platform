import Image from "next/image";
import { Input } from "@/components/ui/input";
import PathCard from "@/components/paths/path-card";

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
  return (
    <div className="flex flex-1 flex-col items-center">
      <div
        className="relative h-[var(--safe-content-height)] w-full max-w-7xl overflow-auto border-l border-r"
      >
        <div className="w-full transition-all duration-0 ease-in-out">
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
        <div className="sticky top-0 z-10 flex w-full flex-row items-center justify-between gap-4 border-b border-t bg-background px-4 py-2 md:px-6 md:py-4">
          <h1 className="w-full text-sm font-semibold md:text-base lg:text-lg">
            Where do you want to start from?
          </h1>
          <Input
            placeholder="Search for a starting point"
            className="max-w-md"
          />
        </div>
        <div className="grid grid-cols-1 gap-3 px-4 py-2 pb-16 md:grid-cols-2 md:px-6 md:py-4 lg:grid-cols-3 xl:grid-cols-4">
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
  );
}
