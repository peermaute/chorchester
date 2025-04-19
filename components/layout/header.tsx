"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { Navigation } from "./navigation";
import { navigationItems } from "@/lib/config/navigation";
import { layoutConfig } from "@/lib/config/layout";

export const Header = () => {
  const router = useRouter();
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <header
      className={`w-full bg-background border-b ${layoutConfig.border.default} ${layoutConfig.height.header}`}
    >
      <div
        className={`${layoutConfig.maxWidth} mx-auto ${layoutConfig.padding.x} h-full`}
      >
        <div className="flex justify-between items-center h-full">
          <div
            className="flex items-center space-x-4 transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
            onClick={() => router.push("/")}
          >
            <div className="w-[70px] h-[70px] relative">
              <Image
                src={"/unimusik-logo.jpeg"}
                alt={"Unimusik Logo"}
                fill
                priority={true}
                loading="eager"
                quality={100}
                sizes="70px"
                className={`hover:cursor-pointer rounded-lg object-contain transition-opacity duration-300 ${
                  isImageLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoadingComplete={() => setIsImageLoaded(true)}
              />
            </div>
            <h1 className="text-xl font-extrabold text-foreground hover:cursor-pointer font-sans uppercase tracking-tight">
              Chorchester
            </h1>
          </div>
          <Navigation
            items={navigationItems}
            variant="desktop"
            className="hidden md:flex"
          />
        </div>
      </div>
    </header>
  );
};
