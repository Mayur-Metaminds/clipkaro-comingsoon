import Link from "next/link";

export interface LegalSection {
  title: string;
  content: string[];
  list?: string[];
}

export interface LegalPageData {
  title: string;
  lastUpdated?: string;
  sections: LegalSection[];
  contactEmail?: string;
}

interface LegalPageProps {
  data: LegalPageData;
}

export function LegalPage({ data }: LegalPageProps) {
  const lastUpdated = data.lastUpdated || new Date().toLocaleDateString();

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-stone-600 transition hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-300"
          >
            <svg
              className="mr-2 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Home
          </Link>
        </div>

        <div className="rounded-xl border border-stone-200 bg-white p-8 shadow-sm dark:border-stone-800 dark:bg-stone-900">
          <h1 className="mb-2 text-3xl font-semibold text-stone-900 dark:text-stone-50">
            {data.title}
          </h1>
          <p className="mb-8 text-sm text-stone-600 dark:text-stone-400">
            Last updated: {lastUpdated}
          </p>

          <div className="prose prose-stone dark:prose-invert max-w-none">
            {data.sections.map((section, index) => (
              <section key={index} className="mb-8">
                <h2 className="mb-4 text-xl font-semibold text-stone-900 dark:text-stone-50">
                  {section.title}
                </h2>
                {section.content.map((paragraph, pIndex) => (
                  <p
                    key={pIndex}
                    className="mb-4 text-stone-700 dark:text-stone-300"
                    dangerouslySetInnerHTML={{ __html: paragraph }}
                  />
                ))}
                {section.list && (
                  <ul className="mb-4 list-disc space-y-2 pl-6 text-stone-700 dark:text-stone-300">
                    {section.list.map((item, lIndex) => (
                      <li key={lIndex}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
