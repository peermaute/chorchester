"use client";
import { User } from "@/app/types/User";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const UserCard = ({
  user,
  className,
  showDetails = false,
}: {
  user: User;
  className?: string;
  showDetails?: boolean;
}) => {
  const router = useRouter();

  return (
    <div
      className={cn(
        "group relative rounded-lg bg-card shadow-sm overflow-hidden cursor-pointer",
        className
      )}
      onClick={() => router.push(`/users/${user.id}`)}
    >
      <div className="relative h-full w-full">
        <Image
          src={user.picture ?? "/person.svg"}
          alt={user.name}
          fill
          className="object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
          <h2 className="text-2xl font-bold text-white mb-2">{user.name}</h2>
          <p className="text-white/80">{user.ensemble}</p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
