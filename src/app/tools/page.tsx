import SipCalculator from "../components/SipCalculator";
export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-slate-50">

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