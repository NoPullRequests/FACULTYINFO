import Link from "next/link";

import { siteConfig } from "@/config/site";

/**
 * Global footer — identity and contact pulled from site config.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-8 sm:px-6 lg:px-8">
        <p className="text-xs text-muted-foreground">
          {siteConfig.name} · {siteConfig.institution}
        </p>
        <p className="text-xs text-muted-foreground">
          <Link
            href={`mailto:${siteConfig.email}`}
            className="underline-offset-4 hover:underline"
          >
            {siteConfig.email}
          </Link>
        </p>
        <p className="text-xs text-muted-foreground">
          © {year} {siteConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
