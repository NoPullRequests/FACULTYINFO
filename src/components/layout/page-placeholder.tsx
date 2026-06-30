/**
 * Phase 3a placeholder — replaced with real sections in Phase 3b.
 */
export function PagePlaceholder({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-5xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      {description ? (
        <p className="mt-4 max-w-lg text-muted-foreground">{description}</p>
      ) : null}
      <div className="mt-8 h-px w-full max-w-md bg-border" />
      <p className="mt-4 text-xs text-muted-foreground">
        Content coming in Phase 3b
      </p>
    </div>
  );
}
