"use client";

import { User } from "@/app/types/User";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export type UserCardVariant = "default" | "search" | "grid";

interface BaseUserCardProps {
  user: User;
  variant?: UserCardVariant;
  className?: string;
  onClick?: () => void;
}

export const BaseUserCard = ({
  user,
  variant = "default",
  className,
  onClick,
}: BaseUserCardProps) => {
  const router = useRouter();
  const isBothEnsembles = user.ensemble === "Kammerchor & Orchester";

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      router.push(`/users/${user.id}`);
    }
  };

  const renderUserInfo = () => {
    if (variant === "search") {
      return (
        <div className="flex flex-col min-w-0">
          <h3 className="text-lg font-semibold text-foreground group-hover:text-accent-foreground transition-colors truncate">
            {user.name}
          </h3>
          <div className="flex items-center gap-1.5">
            <span className="text-sm text-muted-foreground truncate">
              {user.ensemble}
            </span>
            {user.stimmgruppe && !isBothEnsembles && (
              <>
                <span className="text-muted-foreground text-xs">•</span>
                <span className="text-sm text-muted-foreground truncate">
                  {user.stimmgruppe}
                </span>
              </>
            )}
            {user.stimmgruppe && isBothEnsembles && (
              <>
                <span className="text-muted-foreground text-xs hidden sm:block">
                  •
                </span>
                <span className="text-sm text-muted-foreground truncate hidden sm:block">
                  {user.stimmgruppe}
                </span>
                {user.instrumentengruppe && (
                  <>
                    <span className="text-muted-foreground text-xs hidden sm:block">
                      •
                    </span>
                    <span className="text-sm text-muted-foreground truncate hidden sm:block">
                      {user.instrumentengruppe}
                    </span>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
        <h2 className="text-2xl font-bold text-white mb-2">{user.name}</h2>
        <p className="text-white/80">{user.ensemble}</p>
      </div>
    );
  };

  const getCardClasses = () => {
    switch (variant) {
      case "search":
        return cn(
          "group relative rounded-lg bg-card p-4 shadow-sm transition-all duration-200",
          "hover:shadow-md hover:bg-accent/5 hover:scale-[1.02]",
          "active:scale-[0.98] cursor-pointer",
          className
        );
      case "default":
      default:
        return cn(
          "group relative rounded-lg bg-card shadow-sm overflow-hidden cursor-pointer",
          className
        );
    }
  };

  const getImageClasses = () => {
    switch (variant) {
      case "search":
        return "rounded-full object-cover border-2 border-border aspect-square";
      case "default":
      default:
        return "object-cover";
    }
  };

  const renderImage = () => {
    if (variant === "search") {
      return (
        <Image
          src={user.picture ?? "/person.svg"}
          alt={user.name}
          width={56}
          height={56}
          className={getImageClasses()}
        />
      );
    }

    return (
      <Image
        src={user.picture ?? "/person.svg"}
        alt={user.name}
        fill
        className={getImageClasses()}
      />
    );
  };

  return (
    <div className={getCardClasses()} onClick={handleClick}>
      <div
        className={
          variant === "default"
            ? "relative h-full w-full"
            : "flex items-center gap-4"
        }
      >
        <div className={variant === "search" ? "flex-shrink-0" : ""}>
          {renderImage()}
        </div>
        {renderUserInfo()}
      </div>
    </div>
  );
};
