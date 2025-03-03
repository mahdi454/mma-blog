import * as React from "react";
import { cn } from "@/lib/utils";

export type BadgeProps = React.HTMLAttributes<HTMLDivElement> & {
  pClassName?: string; 
  sClassName?: string; 
};

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, pClassName, sClassName, children = "Top News", ...props }, ref) => {
    return (
      <div
        className={cn(
          "relative py-[1px] pl-2 pr-10 bg-emerald-700 rounded-s-md overflow-y-clip",
          className
        )}
        ref={ref}
        {...props}
      >
        <div className={cn("text-white ", pClassName)}>{children}</div>
        <span
          className={cn(
            "absolute bg-emerald-700 w-[20px] h-[20px] bottom-[3px] -right-[9px] rotate-45",
            sClassName
          )}
        ></span>
      </div>
    );
  }
);

Badge.displayName = "Badge";

export { Badge };
