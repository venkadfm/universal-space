export default function BusinessPage() {
  return (
    <main className="min-h-screen bg-slate-50">

      <section className="max-w-6xl mx-auto py-24 px-6">

        <h1 className="text-5xl font-bold mb-8">
          Online Business
        </h1>

        <p className="text-xl text-gray-600 mb-12">
          Learn how to build scalable online businesses, side hustles and
          passive income streams using technology and AI.
        </p>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white rounded-2xl shadow p-8">
            <h2 className="text-2xl font-semibold mb-4">
              Side Hustles
            </h2>

            <p className="text-gray-600">
              Business ideas you can start with low investment.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow p-8">
            <h2 className="text-2xl font-semibold mb-4">
              Digital Products
            </h2>

            <p className="text-gray-600">
              Learn how to create products that generate recurring income.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow p-8">
            <h2 className="text-2xl font-semibold mb-4">
              Automation
            </h2>

            <p className="text-gray-600">
              Use AI and Python to automate your business processes.
            </p>
          </div>

        </div>

      </section>

    </main>
  );
}