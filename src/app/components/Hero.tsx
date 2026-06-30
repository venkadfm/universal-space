export default function Hero() {
  return (
    <section className="max-w-6xl mx-auto text-center py-28 px-6">

      <h1 className="text-6xl md:text-7xl font-extrabold leading-tight">
        Universal Space
      </h1>

      <div className="mt-8">

        <p className="text-3xl font-semibold text-blue-600">
          Your Space for AI, Wealth & Growth.
        </p>

        <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-6">
          Helping busy professionals leverage Artificial Intelligence,
          investing, technology and online business ideas to build
          long-term wealth and financial freedom.
        </p>

      </div>

      <div className="flex justify-center gap-5 mt-10">

        <button className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition shadow-lg">
          Explore Articles
        </button>

        <button className="border border-blue-600 text-blue-600 px-8 py-4 rounded-xl hover:bg-blue-50 transition">
          Join Newsletter
        </button>

      </div>

    </section>
  );
}