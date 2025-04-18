import { User } from "@/app/types/User";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface UserCardProps {
  user: User;
  className?: string;
  showDetails?: boolean;
}

export default function UserCard({
  user,
  className,
  showDetails = true,
}: UserCardProps) {
  return (
    <Card className={cn("w-full border-0 shadow-none rounded-xl", className)}>
      <CardContent className="p-0 h-full relative">
        <div className="relative h-full w-full rounded-xl overflow-hidden">
          <Image
            src={user.picture ?? "/person.svg"}
            alt={user.name}
            fill
            className="object-cover"
          />
          {showDetails && (
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
              <h2 className="text-2xl font-bold text-white mb-2">
                {user.name}
              </h2>
              <p className="text-white/80">{user.ensemble}</p>
              {user.stimmgruppe && (
                <p className="text-white/80">{user.stimmgruppe}</p>
              )}
              {user.instrumentengruppe && (
                <p className="text-white/80">{user.instrumentengruppe}</p>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
