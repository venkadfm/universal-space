export default function About() {
  return (
    <main className="min-h-screen bg-slate-50">

      <section className="max-w-5xl mx-auto py-24 px-6">

        <h1 className="text-5xl font-bold mb-8">
          About Universal Space
        </h1>

        <p className="text-xl text-gray-700 leading-9 mb-8">
          Universal Space is dedicated to helping professionals grow through
          Artificial Intelligence, investing, technology, online business and
          personal finance.
        </p>

        <p className="text-lg text-gray-600 leading-8 mb-8">
          Our mission is simple:
          provide practical knowledge that saves time,
          helps build wealth and creates financial freedom.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-16">

          <div className="bg-white rounded-2xl shadow p-8">
            <div className="text-5xl mb-4">🤖</div>
            <h2 className="text-2xl font-semibold mb-3">
              AI
            </h2>
            <p>
              Learn practical AI that boosts productivity.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow p-8">
            <div className="text-5xl mb-4">💰</div>
            <h2 className="text-2xl font-semibold mb-3">
              Wealth
            </h2>
            <p>
              Build long-term wealth through smart investing.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow p-8">
            <div className="text-5xl mb-4">🚀</div>
            <h2 className="text-2xl font-semibold mb-3">
              Growth
            </h2>
            <p>
              Build scalable online income and future-proof skills.
            </p>
          </div>

        </div>

      </section>

    </main>
  );
}