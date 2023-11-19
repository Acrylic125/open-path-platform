import PathCard from "@/components/paths/path-card";
import { Button } from "@/components/ui/button";

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
    <div className="flex w-full flex-1 flex-col items-center">
      <section className="relative flex h-[var(--safe-content-height)] w-full max-w-7xl flex-col overflow-auto">
        {/* <header className="text-ce flex w-full flex-col items-center gap-1 p-4 md:p-8 lg:p-12">
          <h1 className="w-full text-center text-lg font-bold md:text-xl lg:text-2xl">
            Let{"'"}s get started!
          </h1>
          <h1 className="w-full text-center text-sm md:text-base lg:text-lg">
            Choose how you would like to get to your destination.
          </h1>
        </header> */}
        <div className="sticky top-0 z-10 w-full border-b border-t bg-background px-4 py-2 md:gap-6 md:px-6 md:py-4">
          <h2 className="w-full text-sm font-semibold md:text-base lg:text-lg">
            Go to
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-2 px-4 py-2 pb-16 md:grid-cols-2 md:gap-4 md:px-6 md:py-4 lg:grid-cols-3 xl:grid-cols-4">
          {paths.map((p) => (
            <PathCard
              key={p.id}
              id={p.id}
              image={p.image}
              location={p.location}
              subLocation={p.subLocation}
              href={`/destinations/${p.id}`}
            />
          ))}
        </div>
      </section>
      <div className="fixed bottom-6 right-6 z-50 flex w-fit shadow-2xl md:hidden">
        <Button size="lg">New Path</Button>
      </div>
    </div>
  );
}
