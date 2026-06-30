import { PagePlaceholder } from "@/components/layout/page-placeholder";
import { siteConfig } from "@/config/site";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <PagePlaceholder
        title="Contact"
        description="Office, email, and office hours — form coming after professor review."
      />
      <div className="mx-auto mt-8 max-w-lg rounded-lg border border-border p-6 text-sm">
        <p>
          <span className="font-medium">Email:</span>{" "}
          <a
            href={`mailto:${siteConfig.email}`}
            className="underline-offset-4 hover:underline"
          >
            {siteConfig.email}
          </a>
        </p>
        <p className="mt-3">
          <span className="font-medium">Office:</span> {siteConfig.office}
        </p>
      </div>
    </div>
  );
}
