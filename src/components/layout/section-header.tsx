import { ButtonLink } from "@/components/ui/button-link";
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
  className?: string;
};

/**
 * Reusable section title with optional "view all" link.
 */
export function SectionHeader({
  title,
  description,
  href,
  linkLabel = "View all",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div>
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        {description ? (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {href ? (
        <ButtonLink href={href} variant="outline" size="sm">
          {linkLabel}
        </ButtonLink>
      ) : null}
    </div>
  );
}
