import { ListIcon, MusicIcon, UserIcon } from "@/components/ui/icons/custom-icons";
import { NavigationItem } from "@/types/navigation";

export const navigationItems: NavigationItem[] = [
  {
    path: "/",
    icon: <ListIcon className="h-5 w-5" />,
    label: "Home",
  },
  {
    path: "/songs",
    icon: <MusicIcon className="h-5 w-5" />,
    label: "Songs",
  },
  {
    path: "/profile",
    icon: <UserIcon className="h-5 w-5" />,
    label: "Profile",
  },
]; 