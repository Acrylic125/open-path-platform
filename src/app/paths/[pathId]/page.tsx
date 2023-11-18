import Image from "next/image";
import { Input } from "@/components/ui/input";
import AutoSizerScrollView from "@/components/utils/auto-sizer-scroll-view";
import StartPathLayout from "@/components/paths/start-path-layout";
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
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });

  // In the desktop view, there are 2 sections, the image preview and the main content.
  // The content may be scrollable but the image preview needs to stay put. Thus, we need
  // to use an overflow-auto to isolate this scrolling region.
  //
  // CSS overflow auto requires a fixed height (e.g. 240px, 100vh).
  // We want the height of the starting position list container to take up the remaining
  // height of the page. Thus, in order to calculate this, we take the current offset y position
  // from the total height of the page.

  return (
    <div className="flex flex-1 flex-col items-center">
      {/* <h1>Hello</h1> */}

      <StartPathLayout className="relative overflow-auto">
        {/* <div className="grid grid-cols-1 gap-2 p-4 md:gap-4 md:px-6"> */}
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
      </StartPathLayout>
    </div>
  );
}
