"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
const Header = () => {
  const router = useRouter();
  return (
    <header className="shadow-sm pt-4 pb-2 mb-4">
      <div className="flex justify-center items-center">
        <h1
          className="text-2xl mr-4 font-semibold pb-1 hover:cursor-pointer"
          onClick={() => router.push("/")}
        >
          Chorchester
        </h1>
        <Image
          src={"/unimusik-logo.png"}
          alt={"Profile Picture"}
          width={150}
          height={150}
          priority={true}
          onClick={() => router.push("/")}
          className="hover:cursor-pointer"
        />
      </div>
    </header>
  );
};

export default Header;
