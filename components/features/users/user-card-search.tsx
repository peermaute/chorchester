"use client";

import { User } from "@/app/types/User";
import { BaseUserCard } from "./base-user-card";

interface UserCardSearchProps {
  user: User;
  className?: string;
  onClick?: () => void;
}

export const UserCardSearch = ({
  user,
  className,
  onClick,
}: UserCardSearchProps) => {
  return (
    <BaseUserCard
      user={user}
      variant="search"
      className={className}
      onClick={onClick}
    />
  );
};

export default UserCardSearch;
