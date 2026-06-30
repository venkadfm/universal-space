export default function ReviewsPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="max-w-6xl mx-auto py-24 px-6">

        <h1 className="text-5xl font-bold mb-8">
          Reviews
        </h1>

        <p className="text-xl text-gray-600 mb-12">
          Honest reviews of AI tools, software, gadgets and services to help
          you make better buying decisions.
        </p>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white rounded-2xl shadow p-8">
            <h2 className="text-2xl font-semibold mb-4">
              AI Software
            </h2>

            <p className="text-gray-600">
              ChatGPT, Claude, Gemini, Cursor and more.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow p-8">
            <h2 className="text-2xl font-semibold mb-4">
              Technology
            </h2>

            <p className="text-gray-600">
              Laptops, phones, accessories and productivity gear.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow p-8">
            <h2 className="text-2xl font-semibold mb-4">
              Productivity
            </h2>

            <p className="text-gray-600">
              Apps and services that improve your workflow.
            </p>
          </div>

        </div>

      </section>
    </main>
  );
}