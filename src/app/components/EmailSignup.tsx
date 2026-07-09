"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, Mail } from "lucide-react";

type EmailSignupProps = {
  title?: string;
  description?: string;
  source?: string;
  compact?: boolean;
};

function buildMailto(email: string, source: string) {
  const subject = encodeURIComponent(`Add ${email} to Venveel updates`);
  const body = encodeURIComponent(
    [
      "Hi Venveel,",
      "",
      "Please add me to Venveel updates.",
      "",
      `Email: ${email}`,
      `Source: ${source}`,
      "",
      "I am interested in practical guides, tools, and tax/personal finance updates.",
    ].join("\n")
  );

  return `mailto:hello.venveel@gmail.com?subject=${subject}&body=${body}`;
}

export default function EmailSignup({
  title = "Get useful Venveel updates",
  description = "Join for tax-season guides, calculators, AI tools, buying guides, and practical decision notes.",
  source = "Website signup",
  compact = false,
}: EmailSignupProps) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedEmail = email.trim();

    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setMessage("Enter a valid email address.");
      return;
    }

    setMessage("Your email app will open with a pre-filled signup request.");
    window.location.href = buildMailto(trimmedEmail, source);
  };

  return (
    <div
      className={
        compact
          ? "rounded-2xl border border-blue-200 bg-blue-50 p-5"
          : "premium-surface mx-auto max-w-3xl rounded-3xl p-6 md:p-10"
      }
    >
      <div className={compact ? "text-left" : "text-center"}>
        <div
          className={
            compact
              ? "mb-3 inline-flex items-center gap-2 text-sm font-black text-blue-800"
              : "mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-bold text-blue-800"
          }
        >
          <Mail className="size-4" />
          Free updates
        </div>

        <h2
          className={
            compact
              ? "text-xl font-black tracking-tight text-slate-950"
              : "text-3xl font-bold text-slate-900 md:text-4xl"
          }
        >
          {title}
        </h2>

        <p
          className={
            compact
              ? "mt-2 text-sm leading-6 text-slate-600"
              : "mx-auto mt-4 max-w-2xl text-gray-600"
          }
        >
          {description}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className={
          compact
            ? "mt-4 grid gap-3"
            : "mx-auto mt-7 flex max-w-xl flex-col gap-3 sm:flex-row"
        }
      >
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter your email"
          className="min-h-12 flex-1 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
          aria-label="Email address"
        />

        <button
          type="submit"
          className="brand-button inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-5 text-sm font-bold"
        >
          Join updates
          <ArrowRight className="size-4" />
        </button>
      </form>

      {message && (
        <p
          className={
            compact
              ? "mt-3 text-sm font-semibold text-blue-900"
              : "mt-4 text-center text-sm font-semibold text-blue-800"
          }
        >
          {message}
        </p>
      )}

      <p
        className={
          compact
            ? "mt-3 text-xs leading-5 text-slate-500"
            : "mx-auto mt-4 max-w-xl text-center text-xs leading-5 text-slate-500"
        }
      >
        No spam. Unsubscribe anytime by replying to an email. This temporary
        signup opens your email app until the newsletter backend is connected.
      </p>
    </div>
  );
}
