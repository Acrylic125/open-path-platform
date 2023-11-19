import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function PathCard({
  id,
  image,
  location,
  subLocation,
  href,
  className,
}: {
  id: string;
  image: string;
  location: string;
  subLocation: string[];
  href?: string;
  className?: string;
}) {
  return (
    <Link href={href ?? ""} prefetch={false}>
      <Card
        tabIndex={0}
        className={cn(
          className,
          "flex h-fit overflow-hidden hover:border-foreground focus:border-foreground md:flex-col",
        )}
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
    </Link>
  );
}
