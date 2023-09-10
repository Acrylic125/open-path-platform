import Head from "next/head";
import Link from "next/link";
import { api } from "@/utils/api";
import { Button } from "@/components/ui/button";
import { MainNavbar } from "@/components/main/main-navbar";

export default function Home() {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="relative h-screen">
        <MainNavbar className="sticky top-0" />
        <div className="h-screen bg-slate-600">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos,
          incidunt. Voluptates corporis odit officiis unde natus ipsa ullam
          excepturi nihil.
        </div>
      </main>
    </>
  );
}
