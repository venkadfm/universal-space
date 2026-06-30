export default function AIPage() {
  return (
    <main className="min-h-screen bg-slate-50">

      <section className="max-w-6xl mx-auto py-24 px-6">

        <h1 className="text-5xl font-bold mb-8">
          Artificial Intelligence
        </h1>

        <p className="text-xl text-gray-600 mb-12">
          Discover practical AI tools, tutorials, automation ideas and
          productivity hacks that save time and help you work smarter.
        </p>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white rounded-2xl shadow p-8">
            <h2 className="text-2xl font-semibold mb-4">
              AI Tools
            </h2>

            <p className="text-gray-600">
              Reviews of the best AI tools for professionals.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow p-8">
            <h2 className="text-2xl font-semibold mb-4">
              Automation
            </h2>

            <p className="text-gray-600">
              Learn how to automate repetitive work using AI.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow p-8">
            <h2 className="text-2xl font-semibold mb-4">
              Tutorials
            </h2>

            <p className="text-gray-600">
              Step-by-step AI guides for beginners and professionals.
            </p>
          </div>

        </div>

      </section>

    </main>
  );
}