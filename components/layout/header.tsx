"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { Navigation } from "./navigation";
import { navigationItems } from "@/lib/config/navigation";
import { theme } from "@/lib/config/theme";

export const Header = () => {
  const router = useRouter();
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <header
      className={`w-full ${theme.colors.background.primary} border-b ${theme.colors.border.default} ${theme.layout.header.height}`}
    >
      <div
        className={`${theme.spacing.container.maxWidth} mx-auto ${theme.spacing.container.padding} h-full`}
      >
        <div className="flex justify-between items-center h-full">
          <div
            className={`flex items-center ${theme.spacing.elements.medium} ${theme.transitions.hover}`}
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
            <h1 className={theme.typography.heading.h1}>Chorchester</h1>
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
