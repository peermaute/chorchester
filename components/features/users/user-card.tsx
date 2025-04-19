"use client";

import { User } from "@/app/types/User";
import { BaseUserCard } from "./base-user-card";

interface UserCardProps {
  user: User;
  className?: string;
  onClick?: () => void;
}

export const UserCard = ({ user, className, onClick }: UserCardProps) => {
  return (
    <BaseUserCard
      user={user}
      variant="default"
      className={className}
      onClick={onClick}
    />
  );
};

export default UserCard;
