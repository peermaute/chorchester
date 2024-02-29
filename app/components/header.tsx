"use client";
import { useRouter } from "next/navigation";
const Header = () => {
  const router = useRouter();
  return (
    <header>
      <h1
        className="text-3xl text-center mt-9 mb-9 hover:cursor-pointer"
        onClick={() => router.push("/")}
      >
        Unimusik Hamburg
      </h1>
    </header>
  );
};

export default Header;
