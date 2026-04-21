import "./App.css";
import ChatUI from "./components/ChatUI";

function App() {
  return (
    <>
      <div className="font-sans bg-white text-gray-900">
        {/* NAVBAR */}
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <h1 className="text-xl font-semibold tracking-tight">Alliance</h1>

            <div className="hidden md:flex space-x-10 text-sm text-gray-600">
              <a href="#" className="hover:text-black transition">
                Home
              </a>
              <a href="#" className="hover:text-black transition">
                Properties
              </a>
              <a href="#" className="hover:text-black transition">
                About
              </a>
              <a href="#" className="hover:text-black transition">
                Contact
              </a>
            </div>

            <button className="bg-black text-white px-5 py-2 rounded-full text-sm hover:opacity-80 transition">
              List Property
            </button>
          </div>
        </nav>

        {/* HERO */}
        <section className="relative h-[85vh] flex items-center">
          <img
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa"
            alt="Hero"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-white/70 backdrop-blur-sm" />

          <div className="relative max-w-5xl mx-auto px-6 text-center">
            <h2 className="text-5xl md:text-6xl font-semibold leading-tight tracking-tight">
              Discover Exceptional Living Spaces
            </h2>

            <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
              A refined real estate experience designed to help you buy, sell,
              and invest with confidence in Harare.
            </p>

            {/* SEARCH */}
            <div className="mt-10 bg-white shadow-xl rounded-2xl p-4 flex flex-col md:flex-row gap-4">
              <input
                placeholder="Location"
                className="p-3 border rounded-lg flex-1 outline-none focus:ring-2 focus:ring-black/10"
              />

              <select className="p-3 border rounded-lg flex-1 outline-none">
                <option>Property Type</option>
                <option>House</option>
                <option>Apartment</option>
                <option>Land</option>
              </select>

              <button className="bg-black text-white px-6 py-3 rounded-lg hover:opacity-80 transition">
                Search
              </button>
            </div>
          </div>
        </section>

        {/* TRUST INDICATORS */}
        <section className="py-16 border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Properties Listed", value: "1,200+" },
              { label: "Happy Clients", value: "800+" },
              { label: "Years Experience", value: "10+" },
              { label: "Cities Covered", value: "5+" },
            ].map((item, i) => (
              <div key={i}>
                <p className="text-2xl font-semibold">{item.value}</p>
                <p className="text-gray-500 text-sm mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FEATURED PROPERTIES */}
        <section className="max-w-7xl mx-auto px-6 py-24">
          <h3 className="text-3xl font-semibold mb-12">Featured Properties</h3>

          <div className="grid md:grid-cols-3 gap-10">
            {[1, 2, 3].map((item: number) => (
              <div
                key={item}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition"
              >
                <img
                  src="https://images.unsplash.com/photo-1572120360610-d971b9d7767c"
                  alt="Property"
                  className="h-60 w-full object-cover group-hover:scale-105 transition duration-500"
                />

                <div className="p-6">
                  <h4 className="text-lg font-medium">
                    Modern Family Residence
                  </h4>

                  <p className="text-gray-500 text-sm mt-1">
                    Borrowdale, Harare
                  </p>

                  <p className="text-black font-semibold mt-4">$320,000</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="bg-gray-50 py-24">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h3 className="text-3xl font-semibold mb-12">
              What Our Clients Say
            </h3>

            <div className="grid md:grid-cols-2 gap-10">
              {[
                "Alliance made buying our home effortless. Professional and transparent from start to finish.",
                "A truly premium experience. Their team understands the market and delivers results.",
              ].map((text, i) => (
                <div
                  key={i}
                  className="bg-white p-8 rounded-2xl border border-gray-100"
                >
                  <p className="text-gray-600 italic">“{text}”</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
            alt="About"
            className="rounded-2xl"
          />

          <div>
            <h3 className="text-3xl font-semibold">
              A Modern Approach to Real Estate
            </h3>

            <p className="text-gray-600 mt-6 leading-relaxed">
              Alliance combines market expertise with a refined digital
              experience, helping clients navigate real estate with clarity and
              confidence. We focus on delivering value through insight, design,
              and trust.
            </p>

            <button className="mt-6 bg-black text-white px-6 py-3 rounded-full hover:opacity-80 transition">
              Learn More
            </button>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-black text-white py-24 text-center">
          <h3 className="text-3xl font-semibold">
            Ready to Make Your Next Move?
          </h3>

          <p className="mt-4 text-gray-300">
            Partner with Alliance for a seamless and elevated property
            experience.
          </p>

          <button className="mt-8 bg-white text-black px-8 py-3 rounded-full font-medium hover:opacity-90 transition">
            Get Started
          </button>
        </section>

        {/* FOOTER */}
        <footer className="bg-white border-t border-gray-100 py-10">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between text-sm text-gray-500">
            <div>
              <p className="font-medium text-black">Alliance Real Estate</p>
              <p className="mt-2">Harare, Zimbabwe</p>
            </div>

            <div className="mt-6 md:mt-0">
              <p>Email: info@alliance.co.zw</p>
              <p>Phone: +263 77 000 0000</p>
            </div>
          </div>
        </footer>
      </div>

      <div className="w-full  h-[90vh]">
        <ChatUI />
      </div>
    </>
  );
}

export default App;
