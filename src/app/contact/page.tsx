import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Venveel for feedback, collaborations, sponsorships, partnerships, and business enquiries.",
};

export default function ContactPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-20">

      <h1 className="text-5xl font-bold mb-8">
        Contact
      </h1>

      <p className="text-xl text-gray-600 mb-12">
        We&apos;d love to hear from you. Whether you have a question, feedback,
        collaboration idea or business enquiry, feel free to get in touch.
      </p>

      <div className="grid md:grid-cols-2 gap-8">

        <div className="bg-white rounded-2xl shadow-md p-8">

          <h2 className="text-2xl font-bold mb-4">
            General Enquiries
          </h2>

          <p className="text-gray-600">
            Email:
          </p>

          <a
            href="mailto:venveel.contact@gmail.com"
            className="mt-2 inline-block font-semibold text-blue-700 underline-offset-4 hover:underline"
          >
            venveel.contact@gmail.com
          </a>

          <p className="mt-3 text-sm leading-6 text-gray-500">
            A domain email like hello@venveel.com will be added later.
          </p>

        </div>

        <div className="bg-white rounded-2xl shadow-md p-8">

          <h2 className="text-2xl font-bold mb-4">
            Business & Partnerships
          </h2>

          <p className="text-gray-600">
            For collaborations, sponsorships and business enquiries.
          </p>

          <a
            href="mailto:venveel.contact@gmail.com"
            className="mt-4 inline-block font-semibold text-blue-700 underline-offset-4 hover:underline"
          >
            venveel.contact@gmail.com
          </a>

          <p className="mt-3 text-sm leading-6 text-gray-500">
            Please include a short subject line so we can route your message clearly.
          </p>

        </div>

      </div>

      <div className="bg-slate-100 rounded-2xl p-8 mt-12">

        <h2 className="text-2xl font-bold mb-4">
          Our Goal
        </h2>

        <p className="text-gray-700 leading-8">
          Venveel exists to simplify AI, investing,
          technology and online business for everyone.
          We welcome your ideas and feedback as we continue to grow.
        </p>

      </div>

    </main>
  );
}
