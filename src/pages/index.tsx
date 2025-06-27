import { Inter } from "next/font/google";
import { useSession } from "next-auth/react";
import Navbar from "@/components/layouts/Navbar";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data } = useSession();
  console.log(data);
  return (
    <>
      <Navbar />
      <h1>Home</h1>
    </>
  );
}
