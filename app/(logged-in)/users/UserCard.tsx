"use client";
import { User } from "@/app/types/User";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const UserCard = ({ user }: { user: User }) => {
  const router = useRouter();
  return (
    <div
      className={cn(
        "group relative rounded-lg bg-card p-4 shadow-sm transition-all duration-200",
        "hover:shadow-md hover:bg-accent/5 hover:scale-[1.02]",
        "active:scale-[0.98] cursor-pointer"
      )}
      key={user.id}
      onClick={() => router.push(`users/${user.id}`)}
    >
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0">
          <Image
            src={user.picture ?? "/person.svg"}
            alt={"Profile Picture"}
            width={56}
            height={56}
            className="rounded-full object-cover border-2 border-border aspect-square"
          />
        </div>
        <div className="flex flex-col min-w-0">
          <h3 className="text-lg font-semibold text-foreground group-hover:text-accent-foreground transition-colors truncate">
            {user.name}
          </h3>
          <div className="flex items-center gap-1.5">
            <span className="text-sm text-muted-foreground truncate">
              {user.ensemble}
            </span>
            {user.stimmgruppe && (
              <>
                <span className="text-muted-foreground text-xs">•</span>
                <span className="text-sm text-muted-foreground truncate">
                  {user.stimmgruppe}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
