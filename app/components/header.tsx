"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Header = () => {
  const router = useRouter();
  return (
    <header className="w-full bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div
            className="flex items-center space-x-4 transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
            onClick={() => router.push("/")}
          >
            <Image
              src={"/unimusik-logo.png"}
              alt={"Unimusik Logo"}
              width={70}
              height={70}
              priority={true}
              className="hover:cursor-pointer rounded-lg"
            />
            <h1 className="text-xl font-extrabold text-foreground hover:cursor-pointer font-sans uppercase tracking-tight">
              Chorchester
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
