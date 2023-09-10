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

      <main className="relative h-screen">
        <MainNavbar className="sticky top-0" />
      </main>
    </>
  );
}
