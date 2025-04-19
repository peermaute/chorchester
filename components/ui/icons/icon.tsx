import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface IconProps {
  icon: LucideIcon;
  className?: string;
  size?: number;
  color?: string;
  currentColor?: string;
}

export const Icon = ({
  icon: IconComponent,
  className,
  size = 24,
  color,
  currentColor,
}: IconProps) => {
  return (
    <IconComponent
      className={cn("transition-colors", className)}
      size={size}
      color={currentColor || color}
    />
  );
};
