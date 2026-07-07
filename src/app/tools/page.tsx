import type { Metadata } from "next";
import SipCalculator from "../components/SipCalculator";

export const metadata: Metadata = {
  title: "Tools",
  description:
    "Free calculators and practical tools to help you make smarter productivity and money decisions.",
};

export default function ToolsPage() {
  return (
    <main className="min-h-screen">

      <section className="max-w-6xl mx-auto py-20 px-6">

        <h1 className="text-5xl font-bold text-center">
          Universal Tools
        </h1>

        <p className="text-center text-gray-600 mt-6 text-xl mb-16">
          Free calculators and AI tools to help you work smarter.
        </p>

        <SipCalculator />

      </section>

    </main>
  );
}
