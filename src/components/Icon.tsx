import * as React from "react";
import * as Icons from "lucide-react";

interface IconProps extends Omit<React.ComponentPropsWithoutRef<"svg">, "name"> {
  name: string;
  className?: string;
  size?: number;
}

export function Icon({ name, className, size = 20, ...props }: IconProps) {
  // Map string to Lucide icon component
  const LucideIcon = (Icons as any)[name];

  if (!LucideIcon) {
    // Return a default icon if not found
    return <Icons.HelpCircle className={className} size={size} {...props} />;
  }

  return <LucideIcon className={className} size={size} {...props} />;
}
