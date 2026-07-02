import remarkGfm from "remark-gfm";
import {
  RecommendationBox,
  ProTip,
  WarningBox,
} from "@/app/components/ArticleCallouts";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/articles";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

const mdxComponents = {
  RecommendationBox,
  ProTip,
  WarningBox,

  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className="mt-8 text-3xl font-extrabold tracking-tight text-slate-950"
      {...props}
    />
  ),

  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="mt-8 border-t border-slate-200 pt-6 text-2xl font-bold tracking-tight text-slate-950"
      {...props}
    />
  ),

  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="mt-6 text-xl font-bold tracking-tight text-slate-900"
      {...props}
    />
  ),

  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mt-3 text-base leading-7 text-slate-700" {...props} />
  ),

  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className="mt-3 space-y-2 pl-6 text-base leading-7 text-slate-700"
      {...props}
    />
  ),

  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="list-disc" {...props} />
  ),

  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="my-5 rounded-2xl border-l-4 border-blue-600 bg-blue-50 p-5 text-base font-medium leading-7 text-slate-800"
      {...props}
    />
  ),

  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-4 overflow-x-auto rounded-2xl border border-slate-200">
      <table
        className="w-full border-collapse bg-white text-left text-sm"
        {...props}
      />
    </div>
  ),

  th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className="border-b border-slate-200 bg-slate-100 px-4 py-3 font-bold text-slate-900"
      {...props}
    />
  ),

  td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className="border-b border-slate-100 px-4 py-3 text-slate-700"
      {...props}
    />
  ),

  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="font-semibold text-blue-600 underline-offset-4 hover:underline"
      {...props}
    />
  ),
};

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;

  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12">
      <article className="mx-auto max-w-5xl rounded-3xl bg-white p-7 shadow-xl md:p-10">
        <header className="mb-7 border-b border-slate-200 pb-7">
          <span className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            {article.meta.category}
          </span>

          <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-slate-950 md:text-5xl">
            {article.meta.title}
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-7 text-slate-600">
            {article.meta.description}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-slate-500">
            <span>📅 {article.meta.date}</span>
            <span>•</span>
            <span>✍️ {article.meta.author}</span>
          </div>
        </header>

        <div className="mx-auto max-w-4xl">
          <MDXRemote
            source={article.content}
            components={mdxComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                format: "mdx",
              },
            }}
          />
        </div>
      </article>
    </main>
  );
}