import Head from "next/head";
import Link from "next/link";
import { api } from "@/utils/api";
import { Button } from "@/components/ui/button";
import { MainNavbar } from "@/components/main/main-navbar";
import { MainHead } from "@/components/main/main-head";

export default function Home() {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <MainHead />

      {/* https://stackoverflow.com/questions/46655386/when-css-position-sticky-stops-sticking */}
      <main className="relative h-screen overflow-auto">
        <MainNavbar className="sticky top-0" />
      </main>
    </>
  );
}
