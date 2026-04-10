import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

const SectionHeading = React.forwardRef<HTMLDivElement, SectionHeadingProps>(
  ({ title, subtitle, align = "left", className, ...props }, ref) => {
    const isCenter = align === "center";

    return (
      <div
        ref={ref}
        className={cn(isCenter && "text-center", className)}
        {...props}
      >
        <div
          className={cn(
            "w-12 h-0.5 bg-accent rounded-full mb-4",
            isCenter && "mx-auto"
          )}
        />
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p
            className={cn(
              "text-muted mt-3 max-w-2xl",
              isCenter && "mx-auto"
            )}
          >
            {subtitle}
          </p>
        )}
      </div>
    );
  }
);
SectionHeading.displayName = "SectionHeading";

export { SectionHeading };
export type { SectionHeadingProps };
